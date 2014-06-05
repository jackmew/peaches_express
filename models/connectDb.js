var simpledb = require('mongoose-simpledb');
var settings = require('../settings');

exports.connectDb = function(){
	
	var connect = 'mongodb://';
	connect = connect.concat(settings.user);
	connect = connect.concat(':');
	connect = connect.concat(settings.password);
	connect = connect.concat('@');
	connect = connect.concat(settings.host);
	connect = connect.concat('/');
	connect = connect.concat(settings.db);

	console.log("mongo url : "+connect);

	simpledb.init(connect,function(err,db){
	if(err) return console.error(err);
	console.log(db);

	return db;
	});

}