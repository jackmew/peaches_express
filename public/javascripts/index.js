
$(function(){
	console.log("start");
	/*取得當前host*/	
	current_Url = window.location.host;
	console.log(current_Url);

/******************************** 登入使用者名稱  login *******************************************/
    $("#login_submit").on('click',onLoginSubmit);
/******************************   查詢使用者  query user*********************************/
    $("#query_user").on('click',onQueryUserClick);
/******************************    地址 address  *********************************/
    $("#map").hide();

    //$("#locate_submit").on('click',onLocateClick);

/******************************    頁面轉換 clear資料  *********************************/
    $("a").click(function(e) {
        console.log("a click , start clear something");
        clear();
    });
/****************************** 拍攝照片 photo *****************************/
	$("#file_upload_submit").on('click',onFileUploadClick);


})

/******************************* global variable ************************************************************/
/****login 資料*****/
var storeLogin = {
    name : '',
    phone : '',
    date : ''
}
/******************************    clear  *********************************/
function clear () {
    $("input[name='name']").val("");
    $("input[name='phone']").val("");
    $("input[name='fire_position']").val("");

    $("#map").hide();
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
/******************************    地址 address  *********************************/
/***網頁端的定位 要用另外的方式寫 real-time-geolocation-service-with-node-js ****/
function onLocateClick (){
    console.log("locate");
    $("#map").show();
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
function onSuccess(position) {
    console.log("success located! ");
    console.log('Longitude:'+ position.coords.longitude +'  Latitude :'+position.coords.latitude);
    var longtitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    tinyMap(longtitude,latitude);
}
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
function tinyMap(longtitude,latitude){

        $('#map').tinyMap({
                zoom:16,
                marker: [
                    {addr: [latitude, longtitude], text: 'leanDev'}
                ],
            });
        //再把地圖的中央換為某個位置
        var center = latitude+','+longtitude;
        $('#map').tinyMap(
            'panto', center
        );
        getAddress(latitude,longtitude);
}
//轉換經緯度
function getAddress(latitude,longtitude){
    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longtitude,
        type: 'GET',
        success: function(result){
            console.log("success get address!");
            var address = result.results[0].formatted_address;
            alert(address);
            $("#fire_position").val(address);
        },
        error: function(xhr,result){
            alert("error");
        }
    });
}

/****************************** 拍攝照片 photo *****************************/
function onFileUploadClick(){
	console.log("onFileUploadClick");

	$("#file_upload_div input[type='file']").each(function(){
		//直接抓到file 並且判斷file是不是不存在
		var file = $(this)[0].files[0];
		if(file === undefined){
			console.log("There is no file chosed");
		}else{
			console.log(file);

			var data = new FormData();
			//拿來serialize的是filelist
			var fileList = $(this)[0].files;
			$.each(fileList,function(key,value){
				data.append(key,value);
			});	

			
			console.log('http://'+current_Url+'/fileUpload/');
			$.ajax({
				url: 'http://'+current_Url+'/fileUpload/',
				type: 'POST',
				data: data,
				cache: false,
				dataType: 'json',
				processData: false,
				contentType: false,
				success: function(result){
					//因為dataType:'json',所以回傳的格式也要是json
					alert(result.status);
					console.log("success fileSave");
				},
				error: function(result,jqXHR){
					console.log("error fileSave");
				},
				complete: function(){
					//alert("已上傳");
					$("#file_upload_div input[type='file']").val("");
				}
			});
		}
	});

}

















