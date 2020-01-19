
var glat = null;
var glon = null;
var xmlhttp = null;
var url = null;

//`http://api.openweathermap.org/data/2.5/weather?lat=${glat}&lon=${glon}`;


function setglatlon(position) {
	console.log('setglatlon');
	glat = position.coords.latitude;
	glon = position.coords.longitude;
		
	xmlhttp = new XMLHttpRequest();
	url = `http://api.openweathermap.org/data/2.5/weather?lat=${glat}&lon=${glon}&appid=07654c3e586dd616d29667ab64903644`;
	
	console.log(url);
	
	xmlhttp.onreadystatechange = function() {
		console.log('onreadystatechange');
		if (this.readyState == 4 && this.status == 200) {
		// var myArr = JSON.parse(this.responseText);
		formatjson(this.responseText);
	} else {
	console.log(this.responseText);
	}
	};
	
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function setLocation() {
  if (navigator.geolocation) { 
    navigator.geolocation.getCurrentPosition(setglatlon);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function getWeather() {
console.log('getweather');
	setLocation();
}


function RoundAndFix (n, d) {
    var m = Math.pow (10, d);
    return Math.round (n * m) / m;
}
// console.log (RoundAndFix(8.111111, 3));

function degToCompass(num) { 
    while( num < 0 ) num += 360 ;
    while( num >= 360 ) num -= 360 ; 
    val= Math.round( (num -11.25 ) / 22.5 ) ;
    arr=["N","NNE","NE","ENE","E","ESE", "SE", 
          "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"] ;
    return arr[ Math.abs(val) ] ;
}

function formatjson(rt) {
console.log('myfunflc');
/*



{"coord":{"lon":-113.13,"lat":53.82},
"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],
"base":"stations",
"main":{"temp":248.63,"feels_like":244.34,"temp_min":247.15,"temp_max":250.37,"pressure":1030,"humidity":51},
"visibility":14484,"wind":{"speed":0.62,"deg":187},"clouds":{"all":20},"dt":1579386111,"sys":{"type":1,"id":789,"country":"CA","sunrise":1579361957,"sunset":1579391158},"timezone":-25200,"id":5987945,"name":"Josephburg","cod":200}


*/
   var wdata = JSON.parse(rt);
   var temp = RoundAndFix(wdata.main.temp-273.15,1);
   var feels = RoundAndFix(wdata.main.feels_like-273.15,1);
   var wind = wdata.wind.speed; // m per s
   var winddir = degToCompass(wdata.wind.deg);
   
   out = `temp : ${temp} C 
feels like : ${feels} C
wind : ${wind} m/s 
wind dir : ${winddir} `;
   
   
    document.getElementById("weatherresult").innerHTML = out;
    
    
}