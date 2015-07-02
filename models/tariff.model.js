var mongoose = require('mongoose'),
	model = new mongoose.Schema({
		type: String, // static, full, period
		cost: Number,
		instance: {type: mongoose.Schema.Types.ObjectId, ref: 'Instance'},
		period: [], // {start, stop, cost}
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
			type: ret.type,
			cost: ret.cost,
			instance: ret.instance,
			period: ret.period,
			created_at: ret.created_at,
			updated_at: ret.updated_at
		};
	}
});

module.exports = model;