var stylus = require('stylus'),
	nib = require('nib'),
	path = require('path');

function compile(str, filePath) {
	return stylus(str)
		.set('filename', filePath)
		.set('compress', false)
		.use(nib())
		.import('nib');
}

module.exports = function(publicPath){
	var src, dest;
	publicPath = publicPath || __dirname;
	src = path.normalize(path.join(publicPath, '/stylus/'));
	dest = path.normalize(path.join(publicPath));
	return stylus.middleware({
		src: src,
		dest: dest,
		force: true,
		compile: compile
	})
};