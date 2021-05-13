const { model, Schema, ObjectId } = require('mongoose');

const itemSchema = new Schema(
	{
		//regions arch
		_id: {
			type: ObjectId,
			required: true
		},
		id: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		due_date: {
			type: String,
			required: true
		},
		assigned_to: {
			type: String,
			required: true
		},
		completed: {
			type: String,
			required: true
		},
		landmark: {
			type: String,
			required: true
		},
		parRegId: {
			type: String
		},
		subRegId: {
			type: String
		}
	}
);

const Item = model('Item', itemSchema);
module.exports = Item;