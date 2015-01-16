var geo = navigator.geolocation;
var opciones={}
function geo_error(){

	console.log('error');
}
var base_url	= 	"http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon){
	var query	=	'SELECT * FROM geo.placefinder WHERE text="'+lat+", " +lon+'" AND gflags="R"';
	query= encodeURIComponent(query);
	console.log(query);

	$.ajax({


		url: 	base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 	'procesarGeoInfo',
		data: {

				format: 'json'
		}
	});
}
function obtenerClima(woeid){
	var query	=	'SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" and u="c"';
	query= encodeURIComponent(query);
	console.log(query);

	$.ajax({


		url: 	base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 	'procesarClima',
		data: {

				format: 'json'
		}
	});
}
function geo_exito(posicion){

	
	var lat 	=	posicion.coords.latitude;
	var lon 	=	posicion.coords.longitude;
	var mapa	=	new Image();
	mapa.src 	=	"http://maps.googleapis.com/maps/api/staticmap?maptype=hybrid&zoom=14&size=200x200&sensor=false&center="+lat+","+lon;
	$('#geo').append(mapa);
	obtenerGeoInformacion(lat, lon);

}
$('footer .logos').load('logos_footer.html');
/*get('logos_footer.html',function(codiguito){


	$('footer').append(codiguito);
});*/
$.get('usuario.json',function(info){

	var avatar = new Image();
	avatar.src 	=	info.avatar;
	avatar.title	=	info.nombre + ' ' + info.apellido;
	$('#avatar').append(avatar);
});

function procesarGeoInfo(datos){

	var	res	=	datos.query.results.Result; 
	var barrio		=	res.neighborhood;
	var pais		=	res.country;
	var	ciudad		=	res.city;
	var woeid		=	res.woeid;
	$('#geo').prepend('<p><strong>' + barrio +'</strong><br><strong>' + ciudad + '</strong><br><strong>'+ pais +'</strong></p>');
	obtenerClima(woeid);
}
function procesarClima(datos){

	
	var clima = datos.query.results.channel;
	var temp	=	clima.item.condition.temp;
	var unit	=	clima.units.temperature;
	var img 	=	new Image();
	var code	=	clima.item.condition.code;
	img.src		=	"http://l.yimg.com/a/i/us/we/52/"+code+".gif"
	console.log(clima);	 
	$('#clima')
	.append(img)
	.append(temp+''+unit+'°')

}
geo.getCurrentPosition(geo_exito, geo_error, opciones);