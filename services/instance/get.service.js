var Instance = require('mongoose').model('Instance'),
	Q = require('q');

module.exports = function(id){
	var deferred = Q.defer();
	Instance
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