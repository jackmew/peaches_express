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
		date: loginJson[0].date
	});
	loginDataModel.save();
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