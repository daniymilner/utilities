//todo
var Instance = require('../../services').Instance;

module.exports = function(req, res, next){
	var item = req.body.item;

	if(item){
		if (item.id){
			Instance
				.update(item)
				.then(function(instance){
					res.json(instance);
				}, next);
		}else{
			Instance
				.create(item, req.user)
				.then(function(instance){
					res.json(instance);
				}, next);
		}
	}else{
		next(new Error('No item to create'));
	}
};