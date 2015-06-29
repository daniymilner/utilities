var Tarifs = require('mongoose').model('Tariff'),
	Q = require('q');

module.exports = function(){
	var deferred = Q.defer();
	Tarifs
		.find({})
		.exec(function(err, list){
			if (!err){
				deferred.resolve(list);
			}else{
				deferred.reject(err);
			}
		});
	return deferred.promise;
};