// Saves options to chrome.storage
function save_options() {
  var rp_preimg = document.getElementById('rp_preimg').checked;
  var rp_scroll = document.getElementById('rp_scroll').checked;
  chrome.storage.sync.set({
    preImg: rp_preimg,
    trueScroll: rp_scroll
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Opções Salvas.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    preImg: true,
    trueScroll: true
  }, function(items) {
    document.getElementById('rp_preimg').checked = items.preImg;
    document.getElementById('rp_scroll').checked = items.trueScroll;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);


$.get( "http://ripando.com.br/feed.php?mode=topics", function( data ) {

  $(data).find("entry").each(function () {
        var el = $(this);
        var li = '<li><a href="'+ el.find("id").text() +'" target="_blank">'+ el.find("title").text() +'</a>';

        $(".feed").append(li);
        console.log(li);
    });
  if(window.location.hash == "#popup"){
    $(".navbar").remove();
    $(".jumbotron").remove();
    $(".main").removeClass("container");
    $(".main").addClass("container-fuild");
  }
});
