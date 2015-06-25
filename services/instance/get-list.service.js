var Instance = require('mongoose').model('Instance'),
	Q = require('q');

module.exports = function(){
	var deferred = Q.defer();
	Instance
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