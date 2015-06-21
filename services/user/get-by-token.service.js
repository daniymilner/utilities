var User = require('../../models').User,
	Q = require('q');

module.exports = function(token){
	var deferred = Q.defer();
	User
		.findOne({access_token: token}, function(err, user){
			if(err){
				deferred.reject(err);
			}else{
				if(!user){
					err = new Error('Not found');
					err.status = 404;
					deferred.reject(err);
				}else{
					deferred.resolve(user);
				}
			}
		});
	return deferred.promise;
};