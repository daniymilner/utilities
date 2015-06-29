var Instance = require('../../services').Instance;

module.exports = function(req, res, next){
	var id = req.params.id;
	Instance
		.remove(id)
		.then(function(){
			res.send(200);
		}, next);
};