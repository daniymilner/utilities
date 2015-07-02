var Tariff = require('mongoose').model('Tariff'),
	Q = require('q');

module.exports = function(id){
	var deferred = Q.defer();
	Tariff
		.findById(id)
		.exec(function(err, item){
			if (!err){
				deferred.resolve(item);
			}else{
				deferred.reject(err);
			}
		});
	return deferred.promise;
};