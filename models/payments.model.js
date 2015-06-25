var mongoose = require('mongoose'),
	model = new mongoose.Schema({
		instance_id: {type: mongoose.Schema.Types.ObjectId},
		tariff_id: {type: mongoose.Schema.Types.ObjectId},
		actual_date: {type: Date, default: Date.now},
		start_count: Number,
		stop_count: Number,
		cost: Number,
		year: Number,
		month: Number,
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
			instance_id: ret.instance_id,
			tariff_id: ret.tariff_id,
			actual_date: ret.actual_date,
			start_count: ret.start_count,
			stop_count: ret.stop_count,
			cost: ret.cost,
			year: ret.year,
			month: ret.month,
			created_at: ret.created_at,
			updated_at: ret.updated_at
		};
	}
});

module.exports = model;