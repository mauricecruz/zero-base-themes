

// chrome.devtools.panels.create("DevThemes",'',"devtheme.html", function(panel){

// });

var xhr = new XMLHttpRequest();
xhr.open("GET", "/style.css", false);
xhr.send();
chrome.devtools.panels.applyStyleSheet(xhr.responseText);








