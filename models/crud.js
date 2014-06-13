var db = require('mongoose-simpledb').db;

/*儲存首頁資料 address*/

exports.saveHome = function(addressJson){
	console.log("saveHome");
	console.log(addressJson);
	console.log(addressJson[0].city);
	var address = new db.Address({
		city: addressJson[0].city,
		road: addressJson[0].road,
		section: addressJson[0].section,
		lane: addressJson[0].lane,
		alley: addressJson[0].alley,
		number: addressJson[0].number
	});
	address.save();
}

/******************************** 登入使用者名稱  login *******************************************/
exports.saveLogin = function(loginJson){
	console.log("crud : saveLogin");
	console.log(loginJson);

	var loginDataModel = new db.LoginData({
		name: loginJson[0].name,
		phone: loginJson[0].phone,
		date: loginJson[0].date,
		time: loginJson[0].time
	});
	loginDataModel.save();
}
/*****************************************    地址 address  ************************************/
exports.saveAddress = function(addressJson){
	console.log("crud : saveAddress");
	console.log(addressJson);

	var addressDataModel = new db.FirePosition({
		name : addressJson[0].name,
		loginDate : addressJson[0].login_date,
		loginTime : addressJson[0].login_time,
		address : addressJson[0].fire_position,
		callDate : addressJson[0].call_date,
		callTime : addressJson[0].call_time,
		moveDate : addressJson[0].move_date,
		moveTime : addressJson[0].move_time,
		arriveDate : addressJson[0].arrive_date,
		arriveTime : addressJson[0].arrive_time
	});
	addressDataModel.save();
}
/*****************************************    開口部結構表 open   ************************************/
exports.saveOpen = function(openJson){
	console.log("crud : saveAddress");
	console.log(openJson);
	// console.log(addressJson.name);
	// console.log(addressJson.address[0]);

	var openDataModel = new db.Open();
	openDataModel.name = openJson.name;
	openDataModel.loginDate = openJson.date;
	openDataModel.loginTime = openJson.time;
	openDataModel.position.start = openJson.start;
	openDataModel.position.gate = openJson.gate;
	openDataModel.position.space = openJson.space;
	openDataModel.position.number = openJson.number;

	openDataModel.material.combustible.isCombustible = openJson.isCombustible;
	openDataModel.material.combustible.combustibleThing = openJson.combustibleThing;
	openDataModel.material.combustible.combustibleDescription = openJson.combustibleDescription;
	openDataModel.material.incombustible.isIncombustible = openJson.isIncombustible;
	openDataModel.material.incombustible.incombustibleThing = openJson.incombustibleThing;
	openDataModel.material.incombustible.incombustibleDetail = openJson.incombustibleDetail;
	openDataModel.material.fireproof.isFireproof = openJson.isFireproof;
	openDataModel.material.fireproof.fireproofDetail = openJson.fireproofDetail;
	
	openDataModel.status.atFire = openJson.atfire;
	openDataModel.status.atSurvey = openJson.atsurvey;

	openDataModel.burnStatus.wood.isWoodSmoked = openJson.isWoodSmoked;
	openDataModel.burnStatus.wood.isWoodColor = openJson.isWoodColor;
	openDataModel.burnStatus.wood.colorWoodRange = openJson.colorWoodRange;
	openDataModel.burnStatus.wood.isWoodChar = openJson.isWoodChar;
	openDataModel.burnStatus.wood.charWoodRange = openJson.charWoodRange;
	openDataModel.burnStatus.wood.isWoodCarbonize = openJson.isWoodCarbonize;
	openDataModel.burnStatus.wood.carbonizeWoodRange = openJson.carbonizeWoodRange;
	openDataModel.burnStatus.wood.isWoodPeel = openJson.isWoodPeel;
	openDataModel.burnStatus.wood.peelWoodRange = openJson.peelWoodRange;
	openDataModel.burnStatus.wood.isWoodLost = openJson.isWoodLost;
	openDataModel.burnStatus.wood.lostWoodRange = openJson.lostWoodRange;

	openDataModel.burnStatus.metal.isMetalSmoked = openJson.isMetalSmoked;
	openDataModel.burnStatus.metal.isMetalColor = openJson.isMetalColor;
	openDataModel.burnStatus.metal.colorMetalRange = openJson.colorMetalRange;
	openDataModel.burnStatus.metal.isMetalDeform = openJson.isMetalDeform;
	openDataModel.burnStatus.metal.isMetalMelt = openJson.isMetalMelt;

	openDataModel.burnStatus.glass.isGlassSmoked = openJson.isGlassSmoked;
	openDataModel.burnStatus.glass.isGlassColor = openJson.isGlassColor;
	openDataModel.burnStatus.glass.isGlassBroke = openJson.isGlassBroke;
	openDataModel.burnStatus.glass.isGlassCurd = openJson.isGlassCurd;

	openDataModel.save();
}
/******************************   查詢使用者  query user *********************************/
exports.findLoginUser = function(name,callback){
	console.log("crud : findLoginUser");
	if(name === ""){
		db.LoginData.find({},function(err,result){
			if(err) return console.error(err);
			//console.log(result);
			callback && callback(result);
		});
	}else{
		db.LoginData.find({'name':name},function(err,result){
			if(err) return console.error(err);
			//console.log(result);
			callback && callback(result);
		});
	}
}
/******************************   查詢開口部結構表  query open *********************************/
exports.findOpen = function(name,callback){
	console.log("crud : findOpen");

	if(name === ""){
		db.Open.find({},function(err,result){
			if(err) return console.error(err);
			//console.log(result);
			callback && callback(result);
		});
	}else{
		db.Open.find({'name':name},function(err,result){
			if(err) return console.error(err);
			//console.log(result);
			callback && callback(result);
		});
	}
}
/****************************** 拍攝照片 photo *****************************/
exports.saveImage = function(imageArray){
	console.log("saveImage");
	//console.log(imageArray[0]);

	var image = new db.ImageData({
		fileName: imageArray[0],
		contentType: imageArray[1],
		time: imageArray[2],
		bytes: imageArray[3]

	});
	image.save();

}

/****************************** 查詢上傳照片 query photo *****************************/
exports.findImage = function(name,callback){
	console.log("crud : findImage");
	if(name === ""){
		db.ImageData.find({},function(err,result){
			if(err) return console.error(err);
			//console.log(result);
			callback && callback(result);
		});
	}else{
		db.ImageData.find({'name':name },function(err,result){
			if(err) return console.error(err);
			//console.log(result);
			callback && callback(result);
		});
	}
}


























