var Instance = require('mongoose').model('Instance'),
	Q = require('q');

module.exports = function(item, user){
	var deferred = Q.defer(),
		instance = new Instance();

	instance.name = item.name;
	instance.count = item.count;
	instance.active = item.active;
	instance.user_id = user.id;

	instance.save(function(err, item){
		if (!err){
			deferred.resolve(item);
		}else{
			deferred.reject(err);
		}
	});

	return deferred.promise;
};