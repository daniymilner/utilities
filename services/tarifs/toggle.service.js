var Tariff = require('mongoose').model('Tariff'),
	Q = require('q');

module.exports = function(id){
	var deferred = Q.defer();
	Tariff
		.findById(id)
		.populate('instance')
		.exec(function(err, tariff){
			if (!err){
				tariff.active = !tariff.active;
				tariff.save(function(err, tariff){
					if (!err){
						deferred.resolve(tariff);
					}else{
						deferred.reject(err);
					}
				})
			}else{
				deferred.reject(err);
			}
		});
	return deferred.promise;
};