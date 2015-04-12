// A generic onclick callback function.
function genericOnClick(info, tab) {
  alert("Em Breve!");
}




var contexts = ["selection", "link"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var labels = context;
  var id = chrome.contextMenus.create({"title": "Enviar links para Detona Premium", "contexts":[context], "onclick": genericOnClick});
  	
  console.log("'" + context + "' item:" + id);
}