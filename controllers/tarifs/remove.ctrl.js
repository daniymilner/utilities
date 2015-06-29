//todo
var Instance = require('../../services').Instance;

module.exports = function(req, res, next){
	Instance
		.remove(req.params.id)
		.then(function(){
			res.send(200);
		}, next);
};