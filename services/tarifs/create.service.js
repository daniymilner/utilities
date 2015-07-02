var Tariff = require('mongoose').model('Tariff'),
	Q = require('q');

module.exports = function(item){
	var deferred = Q.defer(),
		tariff = new Tariff();

	tariff.type = item.type.type;
	tariff.cost = item.cost;
	tariff.instance = item.instance.id;
	tariff.period = item.period;

	tariff.save(function(err, item){
		if (!err){
			deferred.resolve(item);
		}else{
			deferred.reject(err);
		}
	});

	return deferred.promise;
};