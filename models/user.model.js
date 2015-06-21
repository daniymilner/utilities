var mongoose = require('mongoose'),
	model = new mongoose.Schema({
		login: {type: String, index: true, unique: true, dropDubs: true},
		password: String,
		name: String,
		email: String,
		access_token: {type: String, default: new mongoose.Types.ObjectId},
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
		delete ret._id;
		delete ret.__v;
		delete ret.password;
		return ret;
	}
});

module.exports = model;