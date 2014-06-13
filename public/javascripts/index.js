
$(function(){
	//document.location.reload(true);
	console.log("start");
	/*取得當前host*/	
	current_Url = window.location.host;
	console.log(current_Url);

/******************************** 登入使用者名稱  login *******************************************/
    $("#login_submit").on('click',onLoginSubmit);
/******************************   查詢使用者  query user*********************************/
    $("#query_user").on('click',onQueryUserClick);
/******************************  查詢開口部結構表  query open  *********************************/
    $("#query_open").on('click',onQueryOpenClick);
/******************************    地址 address  *********************************/
    $("#map").hide();

    $("#locate_submit").on('click',onLocateClick);

    $("#address_submit").on('click',onAddressSubmit);

/******************************    頁面轉換 clear資料  *********************************/
    $("a").click(function(e) {
        console.log("a click , start clear something");
        clear();
    });
/****************************** 拍攝照片 photo *****************************/
	$("#file_upload_submit").on('click',onFileUploadClick);

/****************************** 查詢上傳照片 query photo *****************************/
	$("#query_image").on('click',onQueryImageClick);
/******************************  開口部結構表 open *******************************/
	$("#openSubmit").on('click',onOpenSubmit);
})

/******************************* global variable ************************************************************/
/****login 資料*****/
var storeLogin = {
    name : '',
    phone : '',
    date : '',
    time : ''
}
/******************************    clear  *********************************/
function clear () {
    $("input[name='name']").val("");
    $("input[name='phone']").val("");
    $("input[name='fire_position']").val("");

    $("#map").hide();

    $("#div-result-image img").remove();

    $("#div-result-user li").remove();

    $("#query_open_result pre").remove();
}
/******************************** 登入使用者名稱  login *******************************************/
function onLoginSubmit () {
	console.log("login submit");

	var name = $("input[name='name']").val();
	var phone = $("input[name='phone']").val();
	var date = new Date();
	var formatDate = js_yyyy_mm_dd(date);
	var formatTime = js_hh24_mm(date);
	

	/****將login 資料 儲存成global variable*****/
	storeLogin.name = name;
	storeLogin.phone = phone;
	storeLogin.date = formatDate;
	storeLogin.time = formatTime;

	var loginArray = [];
	loginArray.push({
		name:name,
		phone:phone,
		date:formatDate,
		time:formatTime
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
	console.log('http://'+current_Url+'/saveLogin');
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

	var username = $("#queryUser_username").val();

	
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
/******************************  查詢開口部結構表  query open  *********************************/
function onQueryOpenClick(){
	console.log("query open click");

	var username = $("#queryOpen_username").val();

	clear();
	ajax_findOpen(username);
}
function ajax_findOpen(username){
	console.log(current_Url+'/findOpen');
	$.ajax({
		url: 'http://'+current_Url+'/findOpen',
		type: 'GET',
		data:{
			username:username
		},
		success: function(result){
			alert("success : findOpen");

			$.each(result,function(key,value){
				var resultJson = JSON.stringify(result[key] , undefined, 4);

				$("#query_open_result").append("<pre>"+syntaxHighlight(resultJson)+"</pre>");
			});
			
			
		},
		error: function(xhr,status){
			alert("error : findLoginUser");
		}
	});
}
/*************************javascript YYYY/MM/DD HH24:MM:SS**********************/
function js_yyyy_mm_dd (examTime) {
	  var now = new Date(examTime);
	  var year = "" + now.getFullYear();
	  var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
	  var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
	  var formatDate = [year,month,day].join('-');
	  return formatDate;
}
/*************************javascript YYYY/MM/DD HH24:MM:SS**********************/
function js_hh24_mm (examTime) {
	  var now = new Date(examTime);
	  var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
	  var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
	  //var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
	  //var formatTime = [hour,minute,second].join(':');
	  var formatTime = [hour,minute].join(':');
	  return formatTime;
}
/******************************    地址 address  *********************************/
/***網頁端的定位 要用另外的方式寫 real-time-geolocation-service-with-node-js ****/
function onLocateClick (){
    console.log("locate");
    $("#map").show();
    //html5 geolocation 跟 phongap geolocation 根本幾乎一模一樣
    //有了html5 geolocation根本也不需要用TinyMap了..
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    console.log("success located! ");
    console.log('Longitude:'+ position.coords.longitude +'  Latitude :'+position.coords.latitude);
    var longtitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    tinyMap(longtitude,latitude);
}
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
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
            //alert(address);
            $("#fire_position").val(address);
        },
        error: function(xhr,result){
            alert("error");
        }
    });
}
function onAddressSubmit(){
	var fire_position = $("#fire_position").val();
	var call_date = $("#call_date").val();
	var call_time = $("#call_time").val();
	var move_date = $("#move_date").val();
	var move_time = $("#move_time").val();
	var arrive_date = $("#arrive_date").val();
	var arrive_time = $("#arrive_time").val();

	// console.log(storeLogin.name);
	// console.log(storeLogin.date);
	// console.log(storeLogin.time);
	// console.log(fire_position);
	// console.log(call_date);
	// console.log(call_time);
	// console.log(move_date);
	// console.log(move_time);
	// console.log(arrive_date);
	// console.log(arrive_time);

	var addressArray = [];
	addressArray.push({
		name:storeLogin.name,
		login_date:storeLogin.date,
		login_time:storeLogin.time,
		fire_position:fire_position,
		call_date:call_date,
		call_time:call_time,
		move_date:move_date,
		move_time:move_time,
		arrive_date:arrive_date,
		arrive_time:arrive_time,
	});
	ajax_addressSubmit(addressArray);
}
function ajax_addressSubmit(addressArray){
	var addressJson = JSON.stringify(addressArray);
	console.log(addressJson);

	$.ajax({
		url: 'http://'+current_Url+'/saveAddress',
		type: 'POST',
		contentType: 'application/json; charset=UTF-8',
		data: addressJson,
		success: function(result){
			console.log("success : address submit");
			alert(result);
		},
		error: function(xhr,status){
			alert("error : address submit");
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

/****************************** 查詢上傳照片 query photo *****************************/
function onQueryImageClick(){
	var username = $("input [name='img_username']").val();
	ajax_findImage(username);
}

function ajax_findImage(username){
	console.log(current_Url+'/findImage');
	$.ajax({
		url: 'http://'+current_Url+'/findImage',
		type: 'GET',
		data:{
			username:username
		},
		success: function(result){
			console.log("find Image success");
			//alert("success : findLoginUser");
			alert("查到"+result.length+"筆照片");
			addImage(result);
			//addLoginUser_listview(result);
		},
		error: function(xhr,status){
			alert("error : findImage");
		}
	});
}

function addImage(images){
	$("#div-result-image img").remove();
	var output='';
	$.each(images,function(index,value){
		output += '<img style="height:50%;width:100%;" src="data:'+value.contentType+';base64,'+
	              ''+value.bytes+'"/>';

		$("#div-result-image").append(output);
		//clear output
		output='';
	});
	
}

/******************************  開口部結構表 open *******************************/
function onOpenSubmit(){
	console.log("onOpenSubmit");

	var start = $("#first").val();
	var gate = $("#gate").val();
	var space = $("#space").val();
	var number = $("#num").val();

	var isCombustible = $("#combustible").is(":checked");
	
	var combustibleThing = $("#combustible_select").val();
	var combustibleDescription = $("#combustible_text").val();

	isIncombustible = $("#incombustible").is(":checked");
	
	var incombustibleThing = $("#incombustible_select").val();
	var incombustibleDetail = $("#incombustible_text").val();

	var isFireproof = $("#fireproof").is(":checked");

	var fireproofDetail = $("#fireproof_text").val();

	var atfire = $("#atfire").val();
	var atsurvey = $("#atsurvey").val();

	var isWoodSmoked = $("#wood_smoke").is(":checked");

	var isWoodColor = $("#wood_color").is(":checked");
	var colorWoodRange = $("#wood_color_text").val();

	var isWoodChar = $("#wood_char").is(":checked");
	var charWoodRange = $("#wood_char_text").val();

	var isWoodCarbonize = $("#wood_carbonize").is(":checked");
	var carbonizeWoodRange = $("#wood_carbonize_text").val();

	var isWoodPeel = $("#wood_peel").is(":checked");
	var peelWoodRange = $("#wood_peel_text").val();

	var isWoodLost = $("#wood_lost").is(":checked");
	var lostWoodRange = $("#wood_lost_text").val();

	var isMetalSmoked = $("#metal_smoke").is(":checked");
	var isMetalColor = $("#metal_color").is(":checked");
	var colorMetalRange = $("#metal_color_text").val();
	var isMetalDeform = $("#metal_deform").is(":checked");
	var isMetalMelt = $("#metal_melt").is(":checked");;

	var isGlassSmoked = $("#glass_smoke").is(":checked");
	var isGlassColor = $("#glass_color").is(":checked");
	var isGlassBroke = $("#glass_broke").is(":checked");
	var isGlassCurd = $("#glass_curd").is(":checked");
	// console.log(start);
	// console.log(gate);
	// console.log(space);
	// console.log(number);
	// console.log(isCombustible);
	// console.log(combustibleThing);
	// console.log(combustibleDescription);
	// console.log(isIncombustible);
	// console.log(incombustibleThing);
	// console.log(incombustibleDetail);
	// console.log(isFireproofDetail);
	// console.log(fireproofDetail);

	var openObj = new Object;
	openObj.name = storeLogin.name;
	openObj.date = storeLogin.date;
	openObj.time = storeLogin.time;
	openObj.start = start;
	openObj.gate = gate
	openObj.space = space;
	openObj.number = number;
	openObj.isCombustible = isCombustible;
	openObj.combustibleThing = combustibleThing;
	openObj.combustibleDescription = combustibleDescription;
	openObj.isIncombustible = isIncombustible;
	openObj.incombustibleThing = incombustibleThing ;
	openObj.incombustibleDetail = incombustibleDetail;

	openObj.isFireproof = isFireproof;
	openObj.fireproofDetail =fireproofDetail;

	openObj.atfire = atfire;
	openObj.atsurvey = atsurvey;
	openObj.isWoodSmoked = isWoodSmoked;
	openObj.isWoodColor = isWoodColor;
	openObj.colorWoodRange = colorWoodRange;
	openObj.isWoodChar = isWoodChar ;
	openObj.charWoodRange = charWoodRange;
	openObj.isWoodCarbonize = isWoodCarbonize;
	openObj.carbonizeWoodRange = carbonizeWoodRange;
	openObj.isWoodPeel = isWoodPeel;
	openObj.peelWoodRange = peelWoodRange;
	openObj.isMetalSmoked = isMetalSmoked;
	openObj.isMetalColor = isMetalColor;
	openObj.colorMetalRange = colorMetalRange;
	openObj.isMetalDeform = isMetalDeform;
	openObj.isMetalMelt = isMetalMelt;
	openObj.isGlassSmoked = isGlassSmoked;
	openObj.isGlassColor = isGlassColor;
	openObj.isGlassBroke = isGlassBroke;
	openObj.isGlassCurd = isGlassCurd;

	ajax_openSumbit(openObj);
}
function ajax_openSumbit(openObj){
	var openJson = JSON.stringify(openObj);
	console.log(openJson);

	$.ajax({
		url: 'http://'+current_Url+'/saveOpen',
		type: 'POST',
		contentType: 'application/json; charset=UTF-8',
		data: openJson,
		success: function(result){
			console.log("success : address submit");
			alert(result);
		},
		error: function(xhr,status){
			alert("error : address submit");
		}
	});
}
function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}




