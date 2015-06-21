var path = './config.json',
	config = require(path);

function Config(){
	var envName = 'default';
	this.env = config.env[envName];
}

Config.prototype.get = function(name){
	return config.common[name];
};

Config.prototype.getEnv = function(){
	return this.env;
};

Config.prototype.set = function(key, value){
	config.common[key] = value;
};

module.exports = new Config();