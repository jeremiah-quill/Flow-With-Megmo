const { Schema, model } = require("mongoose");

const classSchema = new Schema({
	date: {
		type: Date,
		required: true,
		// unique: true,
		// trim: true,
	},
	link: {
		type: String,
		required: true
	},
	roster: [
		{
			type: Schema.Types.ObjectId,
			ref: "Student",
		},
	],
	price: {
		type: Number,
		required: true,
	},
	zoomId: {
		type: String,
		required: true,
	},
	playlistId: {
		type: String,
		required: false,
		unique: false,
		// trim: true,
	},
});

const Class = model("Class", classSchema);

module.exports = Class;
