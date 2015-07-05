var TariffService = require('../tarifs/index'),
	Q = require('q');

module.exports = function(item){
	var deferred = Q.defer();

	TariffService
		.get(item.id)
		.then(function(tariff){
			tariff.type = item.type.type || item.type;
			tariff.cost = item.cost;
			tariff.instance = item.instance.id;
			tariff.period = item.period;
			tariff.active = item.active;
			tariff.save(function(err, item){
				if (!err){
					deferred.resolve(item);
				}else{
					deferred.reject(err);
				}
			});
		}, deferred.reject);

	return deferred.promise;
};