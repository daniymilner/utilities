var Instance = require('mongoose').model('Instance'),
	Q = require('q');

module.exports = function(id){
	var deferred = Q.defer();
	Instance
		.findById(id)
		.exec(function(err, instance){
			if (!err){
				instance.status = !instance.status;
				instance.save(function(err, instance){
					if (!err){
						deferred.resolve(instance);
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