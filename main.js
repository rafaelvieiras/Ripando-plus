// $(".tablebg > tbody > tr td:eq(3)").each(function(){
// 	$(this).css("border", "1px solid red");

// 	//$element = $(this).find("a");
// 	//var url = $element.attr("href");
// 	//console.log(url);
// 	//$element.text("Encontrat! URL: "+url)
// });



$("body").delay(800).append('<div class="alertPlugin">Vocês está usando o Ripando Plus! Ajudenos a continuar o projeto, contribua com o codigo <a href="#">aqui</a> ou me compre um <a href="#">café</a>! :D</div>');











/*----------------------------------------
 Preview
------------------------------------------*/
var spinner = '<div class="spinnerBg"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div>';
$("body").append(spinner);
$(".tablebg:contains(Últimos Lançamentos)").next(".tablebg").prepend('<button id="news_user">Novidades dos Usuarios</button><div class="news_user_div">Aguarde...</div>');

var $loading = $('.spinnerBg').hide();

if($("p.breadcrumbs:contains(Dublados)").length > 0 && $('img[alt="Obrigado"]').length == 0){
	var len = $(".topictitle").length;
	$(".topictitle").each(function(index){
		$loading.show();
		$titleHtml = $(this);
		var url = $titleHtml.attr("href");
		var title = $titleHtml.text();
		var image_tag = '';
		$.ajax({ 
		    url: url,
		    async: false,
		    success: function(data) {
		        var html = $.parseHTML( data ), 
		            img = $(html).find(".postbody").find("img"),
		            len = img.length; 
		        if( len > 0 ){
		            var src = img.first().attr("src");
		        } else {
		            console.log("Image not found");
		        }
		        
		        image_tag = '<img src="'+src+'" alt="'+title+'" class="posterRow"/>';
		        return image_tag;
		    }
		});

		console.log(image_tag);
		$titleHtml.parent().append(image_tag);

		if (index == len - 1) {
            console.log('Last field, submit form here');
            $loading.hide();
        }
	});
}

/*----------------------------------------
 Preview - FIM
------------------------------------------*/



/*----------------------------------------
 Infinite Scroll
------------------------------------------*/

$lancamentosLast = $(".tablebg:contains(Últimos Lançamentos)").next(".tablebg").find("tr.row1 > td:not(.gensmall)");


var pag = 1;
var scroll = 40;
$(window).scroll(function(){
	if($('.news_user_div').is(":hidden") == true){
		if($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
			//alert("bottom!");
			$loading.show();
			$.ajax({
				type: "POST",
			    url: "./portal.php",
			    async: false,
	  			data: { np : scroll },
	  			beforeSend: function(){
			    	$loading.show().delay( 800 );
			    	pag++;
					scroll = scroll + 40;
			   	},
			   	complete: function(){
			    	$loading.hide();
			   	},
			    success: function(data) {
			        var html = $.parseHTML( data ), 
			        	lancamentos = $(html).find(".tablebg:contains(Últimos Lançamentos)").next(".tablebg").find("tr.row1 > td:not(.gensmall)").html();	        
			        $lancamentosLast.append(lancamentos).delay( 800 );
			    }
			});
			console.log(pag);
			console.log(scroll);
			
		}
	}
});



/*----------------------------------------
 Infinite Scroll - FIM
------------------------------------------*/




/*----------------------------------------
 Lançamento dos Usuarios
------------------------------------------*/
$("#news_user").click(function(){
	if($('.news_user_div').is(":hidden") == false){
		$("#news_user").text("Novidades dos Usuarios");
		$('.news_user_div').html('Aguarde...');
		$('.news_user_div').hide();
		$('.news_user_div').next('tbody').show();
	}else{
		$("#news_user").text("< Voltar");
		$('.news_user_div').show();
		$('.news_user_div').next('tbody').hide();
		$.ajax({
		    url: "/upusers.php",
		    async: true,
		    success: function(data) {
		        var html = $.parseHTML( data );

		        $(html).find("a").each(function(index){
		        	var url = $(this).attr("href");
		        	var title = $(this).text();
		        	
		        	
		        	$.ajax({
					    url: url,
					    async: true,
					    success: function(data) {
					        var html = $.parseHTML( data ), 
					            img = $(html).find(".postbody").find("img");
					        var user = $(html).find('b:contains(Uploader:)').find('b').text();
					        var htmlfinal = '<div class="postbody"><center><table cellpadding="0" cellspacing="0" border="0" align="center"><tbody><tr><td width="500"><div class="cap-div2">&nbsp;</div><table id="portal_img" class="tablebg" cellpadding="0" cellspacing="0"><tbody><tr><td class="row1" width="40%" align="center"><img alt="" src="'+img.first().attr("src")+'"></td><td class="row1" width="60%" align="center"><center><b><span style="font-size: 150%; line-height: normal"><a href="'+url+'" class="postlink" target="_blank">'+title+'</a></span></b></center><br><b><span style="color: #013FEF"><span style="font-size: 150%; line-height: normal">'+user+'</span></span></b></td></tr></tbody></table></td></tr></tbody></table></center></div>';
					        
					        $('.news_user_div').append(htmlfinal);
					        
					    }
					});
		        });
		    }
		});
	}
});

/*----------------------------------------
 Lançamento dos Usuarios - FIM
------------------------------------------*/