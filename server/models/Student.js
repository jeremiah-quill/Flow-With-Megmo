const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	registeredClasses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Class",
		},
	],
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
});

// compare the incoming password with the hashed password
studentSchema.methods.isCorrectPassword = async function (password) {
	return password === this.password
	// return bcrypt.compare(password, this.password);
  };

const Student = model("Student", studentSchema);

module.exports = Student;
