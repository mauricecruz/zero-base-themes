var xhr = new XMLHttpRequest(),
	stylesheet = 'stable.css';

if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > 50) {
	stylesheet = 'canary.css';
}

xhr.open("GET", "/" + stylesheet, false);
xhr.send();
chrome.devtools.panels.applyStyleSheet(xhr.responseText);
