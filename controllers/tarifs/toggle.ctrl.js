var Tarifs = require('../../services').Tarifs,
	async = require('async');

module.exports = function(req, res, next){
	Tarifs
		.toggle(req.params.id)
		.then(function(tariff){

			Tarifs
				.list()
				.then(function(fullList){
					var list = fullList.filter(function(item){
						return item.instance._id.equals(tariff.instance._id) && !item._id.equals(tariff._id);
					});
					list.forEach(function(item){
						item.active = false;
					});
					async.map(list, function(item, cb){
						Tarifs
							.update(item)
							.then(cb)
					}, function(){
						res.json(fullList);
					});
				});
		}, next);
};