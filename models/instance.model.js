var mongoose = require('mongoose'),
	model = new mongoose.Schema({
		name: String,
		count: Number,
		active: Boolean,
		user_id: {type: mongoose.Schema.Types.ObjectId},
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now}
	});

model.pre('save', function(next){
	this.updated_at = Date.now();
	next();
});

model.set('toJSON', {
	virtuals: true,
	minimize: false,
	transform: function(doc, ret){
		return {
			id: ret._id,
			name: ret.name,
			count: ret.count,
			active: ret.active,
			user_id: ret.user_id,
			created_at: ret.created_at,
			updated_at: ret.updated_at
		};
	}
});

module.exports = model;