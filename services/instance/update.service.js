var InstanceService = require('../instance/index'),
	Q = require('q');

module.exports = function(item){
	var deferred = Q.defer();

	InstanceService
		.get(item.id)
		.then(function(instance){
			instance.name = item.name;
			instance.count = item.count;
			instance.active = item.active;
			instance.save(function(err, item){
				if (!err){
					deferred.resolve(item);
				}else{
					deferred.reject(err);
				}
			});
		}, deferred.reject);

	return deferred.promise;
};