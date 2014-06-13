var express = require('express');
var fs = require('fs');
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
	res.send("儲存登入資料成功");
	
});
/******************************    地址 address  *********************************/
router.post('/saveAddress',function(req,res){
	console.log("router : save address");
	CRUD.saveAddress(req.body);
	res.send("儲存地址成功");
	
});
/******************************    開口部結構表 open  *********************************/
router.post('/saveOpen',function(req,res){
	console.log("router : save saveOpen");
	CRUD.saveOpen(req.body);
	res.send("儲存開口部結構表成功");
	
});
/******************************  查詢使用者  query user *********************************/
router.get('/findLoginUser',function(req,res){
	console.log("route : findLoginUser");
	var name = req.query.username;
	CRUD.findLoginUser(name,function(result){
		res.send(result);
	})
});
/******************************  查詢開口部結構表  query open *********************************/
router.get('/findOpen',function(req,res){
	console.log("route : findOpen");

	var name = req.query.username;
	CRUD.findOpen(name,function(result){
		console.log(result);
		res.send(result);
	})
});
/****************************** 拍攝照片 photo *****************************/
router.post('/fileUpload',function(req,res){
	
	
	console.log("fileUpload");
	console.dir(req.files);
	console.dir(req.files[0].path);
	var temPath = './'+req.files[0].path;

	var imageArray = [];
	var originalname = req.files[0].originalname; //hexo4.png
	var originalnameSplit = originalname.split("."); //hexo4,png
	var filename = originalnameSplit[0]; //hexo4
	
	//將uploads的檔案 讀出來 變成binary
	fs.readFile(temPath,function(err,data){
		if(err)console.log("can't read file");

		imageArray.push(filename); 
		imageArray.push(req.files[0].mimetype);
		imageArray.push(new Date());
		//儲存binary
		//imageArray.push(data);
		//儲存base64 string
		imageArray.push(new Buffer(data).toString('base64'));

		CRUD.saveImage(imageArray);
	});
	//儲存完後 就把uploads裡面檔案清掉
	fs.unlink(temPath,function(err,data){
		if(err)console.log("fs unlink fail");

		console.log("fs unlink successfully");

	});
	//因為dataType:'json',所以回傳的格式也要是json
	var jsontext = '{"status":"上傳成功"}';
	res.send(jsontext);	
});

/****************************** 查詢上傳照片 query photo *****************************/
router.get('/findImage',function(req,res){
	console.log("route : findImage");
	var name = req.query.username;
	CRUD.findImage(name,function(result){
		res.send(result);
	
	})
});























module.exports = router;
