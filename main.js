// $(".tablebg > tbody > tr td:eq(3)").each(function(){
// 	$(this).css("border", "1px solid red");

// 	//$element = $(this).find("a");
// 	//var url = $element.attr("href");
// 	//console.log(url);
// 	//$element.text("Encontrat! URL: "+url)
// });

var spinner = '<div class="spinnerBg"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div>';
$("body").delay( 800 ).append(spinner);

var $loading = $('.spinnerBg').hide();

if($("p.breadcrumbs:contains(Dublados)").length > 0){
	$loading.show();
	var len = $(".topictitle").length;
	$(".topictitle").each(function(index){
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