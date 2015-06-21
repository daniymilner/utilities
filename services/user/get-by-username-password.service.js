var User = require('../../models').User,
	Q = require('q'),
	md5 = require('MD5');

module.exports = function(username, password){
	var deferred = Q.defer();
	User
		.findOne({
			login: username,
			password: md5(password)
		}, function(err, user){
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