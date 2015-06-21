var User = require('../../services').User;

module.exports = function(req, res, next){
	var userId = req.params.userId, err;

	if(userId){
		User
			.getById(userId)
			.then(function(user){
				res.send(user);
			}, next);
	}else{
		err = new Error('Bad request');
		err.status = 400;
		next(err);
	}
};