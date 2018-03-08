/*--------------------------------------point-------------------------------------------*/
var _stationStart = ''
var _stationEnd = ''
var t

function getgps(Start, End) {
	//	var base = "http://api.map.baidu.com/direction"
	//	var base = "http://api.map.baidu.com/direction/v2"
	let stationStart = $("#start").val()
	let stationEnd = $("#end").val()
	console.log(stationStart + "======" + stationEnd)

	if(stationStart) {
		getPonit(stationStart, true)
	}
	if(stationEnd) {
		getPonit(stationEnd, false)
	}
	t = setTimeout("gpsList()", 3000)
}
//getgpslist
function gpsList() {
	console.log(_stationEnd + "---------" + _stationEnd)
	var url = "http://api.map.baidu.com/direction/v2/transit?origin=" + _stationStart + "&destination=" + _stationEnd + "&tactics_incity=5&ak=jaVfZoevhZsUkKUvaKFsRxHi1HpHyPqG" +
		"&callback=gps";
	$.getScript(url);
}

function gps(data) {
	console.log(data)
	var _data = data.result.routes
	var line = ''
	for(var i = 0, len = _data.length; i < len; i++) {
		for(var j = 0, length = _data[i].steps.length; j < length; j++) {
			if(_data[i].steps[j][i].vehicle_info.type == 3) {
				line = $('<div class="odd"><div>' + _data[i].steps[j][i].instructions + '</div><div>' + _data[i].steps[j][i].path + '</div></div>')
				$('#path').append(line)
			}
		}
	}

	if(data.message === '成功') {
		clearTimeout(t)
	}
}
//地理坐标获取
function getPonit(obj, isStation) {
	if(isStation) {
		var url = "http://api.map.baidu.com/geocoder/v2/?address=" + obj + "&city=北京市&output=json&ak=jaVfZoevhZsUkKUvaKFsRxHi1HpHyPqG" +
			"&callback=pointStart";
		$.getScript(url);
	} else if(!isStation) {
		var url = "http://api.map.baidu.com/geocoder/v2/?address=" + obj + "&city=北京市&output=json&ak=jaVfZoevhZsUkKUvaKFsRxHi1HpHyPqG" +
			"&callback=pointEnd";
		$.getScript(url);
	}
}

function pointStart(data) {
	var lat = data['result']['location']['lat']
	var lng = data['result']['location']['lng']
	_stationStart = lat + "," + lng
}

function pointEnd(data) {
	var lat = data.result.location.lat
	var lng = data.result.location.lng
	_stationEnd = lat + "," + lng
}
/*--------------------------------------point-------------------------------------------*/
function changeValue() {
	let stationStart = $("#start").val()
	let stationEnd = $("#end").val()
	$("#end").val(stationStart)
	$("#start").val(stationEnd)
}