var InstanceService = require('../instance/index'),
	Q = require('q');

module.exports = function(id){
	var deferred = Q.defer();

	InstanceService
		.get(id)
		.then(function(instance){
			instance.remove(function(err){
				if (!err){
					deferred.resolve();
				}else{
					deferred.reject(err);
				}
			})
		});
	return deferred.promise;
};