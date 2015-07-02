var TarifsService = require('../tarifs/index'),
	Q = require('q');

module.exports = function(id){
	var deferred = Q.defer();

	TarifsService
		.get(id)
		.then(function(tariff){
			tariff.remove(function(err){
				if (!err){
					deferred.resolve();
				}else{
					deferred.reject(err);
				}
			})
		});
	return deferred.promise;
};