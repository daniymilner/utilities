module.exports = function(req, res){
	if (req.user){
		res.json(req.user);
	}else{
		res.sendStatus(401);
	}
};