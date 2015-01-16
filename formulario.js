var $form= $('.formulario'),
	$titulo= $('#titulo'),
	$url= $('#url'),
	$button = $('#mostrarform'),
	$list = $("#contenido"),
	$correo	=	$("#correo"),
	$post = $('.item').first();
	
if(localStorage.getItem('autosave')){

	$titulo.val(sessionStorage.getItem('titulo'));
	$url.val(sessionStorage.getItem('url'));

}
var id= setInterval(function(){

	sessionStorage.setItem('titulo',$titulo.val());
	sessionStorage.setItem('url',$url.val());

},1000);

function mostrarFormulario(ja){
	ja.preventDefault();
	ja.stopPropagation();
	$form.slideToggle();

	console.log($(this).data());

}
function agregarpost(e){
	e.preventDefault();
	var url		=	$url.val(),
		correo	=	$correo.val(),
		titulo	=	$titulo.val();
		$clone 	=	$post.clone();
	$clone.find(".titulo_item a")
		.text(titulo)
		.attr("href", url);
	

	$list.prepend($clone);
	$titulo.val('');
	$url.val('');
	$clone.hide();
	$clone.fadeIn();
	return false;
}
//Eventos

$button.click(mostrarFormulario);
$('nav').on('click',function(){console.log('Soy un nav y me hicieron click')});
$('nav ul').on('click',function(){console.log('Soy un ul y me hicieron click')});
$form.on("submit",agregarpost);
/*$form
.on("submit",agregarpost)
.find('#url')
.on('focus',function(){
	$('#url').val('http://');
})
	.on('blur',function(){

	$('#url').val('');
	});*/



	

