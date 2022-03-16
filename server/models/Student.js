const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new Schema({
	isAdmin: {
		type: Boolean,
		default: false,
	},
	username: {
		type: String,
		// required: true,
		trim: true,
		required: [true, "Please enter a username."],
		minlength: 3,
		maxlength: 30,
	},
	registeredClasses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Class",
		},
	],
	email: {
		type: String,
		lowercase: true,
		required: [true, "email is required"],
		match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email format"],
		validate: {
			validator: function (v) {
				return this.model("Student")
					.findOne({ email: v })
					.then((user) => !user);
			},
			message: (props) => `Email is already used by another user.`,
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
		maxlength: 30,
	},
	isSendNotifications: {
		type: Boolean,
		default: true,
	},
});

// set up pre-save middleware to create password
studentSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
	  const saltRounds = 10;
	  this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
  });

// compare the incoming password with the hashed password
studentSchema.methods.isCorrectPassword = async function (password) {
	// return password === this.password

	if (this.isAdmin === true) {
		return password === this.password;
	}

	return bcrypt.compare(password, this.password);
};

const Student = model("Student", studentSchema);

module.exports = Student;
