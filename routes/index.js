var express = require('express');
var router = express.Router();
var CRUD = require('../models/crud');


/* TEST   GET home page. */
router.get('/', function(req, res) {
  	res.render('index', { title: 'Express' });
});

router.post('/save',function(req,res){
	//console.log(req.body);
	CRUD.save(req.body);
});

router.get('/find',function(req,res){

	var name = req.query.monsterName;

	CRUD.find(name,function(result){
		res.send(result);
	})
});

/* end TEST   GET home page. */

router.post('/saveHome',function(req,res){
	//console.log("saveHome "+req.body);
	CRUD.saveHome(req.body);
});

/******************************** 登入使用者名稱  login *******************************************/
router.post('/saveLogin',function(req,res){
	console.log("router : save login");
	CRUD.saveLogin(req.body);
	res.send("發送成功");
	
});

/******************************  查詢使用者  query user *********************************/
router.get('/findLoginUser',function(req,res){
	console.log("route : findLoginUser");
	var name = req.query.username;
	CRUD.findLoginUser(name,function(result){
		res.send(result);
	})
});






module.exports = router;
