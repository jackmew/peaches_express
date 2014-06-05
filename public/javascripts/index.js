
$(function(){
	$("button[name='submitHome']").on('click',onSubmitHome);
	/*取得當前host*/	
	current_Url = window.location.host;
	console.log(current_Url);

/******************************** 登入使用者名稱  login *******************************************/
	$("#login_submit").on('click',onLoginSubmit);
/******************************   查詢使用者  query user*********************************/
	$("#query_user").on('click',onQueryUserClick);

})

function onSubmitHome(event) {
    alert("onSubmitHome");

    var city = $("#city").val();
    var road = $("#road").val();
    var section = $("#section").val();
    var lane = $("#lane").val();
    var alley = $("#alley").val();
    var number = $("#number").val();

    var arrive_date = $("#arrive_date").val();
    var arrive_ampm = $("#arrive_ampm").val();
    var arrive_hour = $("#arrive_hour").val();
    var arrive_minute = $("#arrive_minute").val();

    var move_date = $("#move_date").val();
    var move_ampm = $("#move_ampm").val();
    var move_hour = $("#move_hour").val();
    var move_minute = $("#move_minute").val();

    var call_date = $("#call_date").val();
    var call_ampm = $("#call_ampm").val();
    var call_hour = $("#call_hour").val();
    var call_minute = $("#call_minute").val();

    var addressArray = [];

    addressArray.push({
		city:city,
		road:road,
		section:section,
		lane:lane,
		alley: alley,
		number: number
	});
	//alert(addressArray);

	ajax_submitHome(addressArray);

}

function ajax_submitHome(addressArray){
	console.log(addressArray);
	var addressJson = JSON.stringify(addressArray);
	console.log(addressJson);
	$.ajax({
		url: current_Url+'saveHome',
		type: 'POST',
		contentType: 'application/json; charset=UTF-8',
		data: addressJson,
		success: function(result){
			alert(result);
		},
		error: function(xhr,status){
			
			alert(xhr);
		}
	});
}


function ajax_find(monsterName){
	$.ajax({
		url: current_Url+'find',
		type: 'GET',
		data:{
			addressName:monsterName
		},
		success: function(result){
			alert(result.length);
			addFindTable(result);
		},
		error: function(xhr,status){
			alert(xhr);
		}
	});
}
/******************************* 之前的 ************************************************************/
/******************************* global variable ************************************************************/
/****login 資料*****/
var storeLogin = {
    name : '',
    phone : '',
    date : ''
}
/******************************** 登入使用者名稱  login *******************************************/
function onLoginSubmit () {
	console.log("login submit");

	var name = $("input[name='name']").val();
	var phone = $("input[name='phone']").val();
	var date = new Date();
	var formatDate = js_yyyy_mm_dd(date);
	

	/****將login 資料 儲存成global variable*****/
	storeLogin.name=name;
	storeLogin.phone=phone;
	storeLogin.date=formatDate;

	var loginArray = [];
	loginArray.push({
		name:name,
		phone:phone,
		date:formatDate
	});
	if(name===""){
		alert("請輸入姓名 謝謝");
	}else{
		ajax_loginSubmit(loginArray);
	}
}
function ajax_loginSubmit (loginArray){

	var loginJson = JSON.stringify(loginArray);
	console.log(loginJson);
	$.ajax({
		url: 'http://'+current_Url+'/saveLogin',
		type: 'POST',
		contentType: 'application/json; charset=UTF-8',
		data: loginJson,
		success: function(result){
			console.log("success : login submit");
			alert(result);
			$.mobile.changePage( "#address", { 
				transition: "slideup", 
				changeHash: false 
			});
		},
		error: function(xhr,status){
			alert("error : login submit");
		}
	});
} 
/******************************  查詢使用者  query user *********************************/
function onQueryUserClick(){
	console.log("query user click");

	var username = $("#username").val();

	
	ajax_findLoginUser(username);

}
function ajax_findLoginUser(username){
	console.log(current_Url+'/findLoginUser');
	$.ajax({
		url: 'http://'+current_Url+'/findLoginUser',
		type: 'GET',
		data:{
			username:username
		},
		success: function(result){
			//alert("success : findLoginUser");
			//alert(result.length);
			addLoginUser_listview(result);
		},
		error: function(xhr,status){
			alert("error : findLoginUser");
		}
	});
}

function addLoginUser_listview(result){
	$("#listview_result-user li").remove();

	var output='';
	$.each(result,function(index,value){
		output += '<li><a>'+value.name+'</a></li>'
	});
	$('#listview_result-user').append(output).listview('refresh');
}
/*************************javascript YYYY/MM/DD HH24:MM:SS**********************/
function js_yyyy_mm_dd (examTime) {
	  var now = new Date(examTime);
	  var year = "" + now.getFullYear();
	  var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
	  var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
	  var formatTime = [year,month,day].join('/');
	  return formatTime;
}




















