var xhr = new XMLHttpRequest(),
	stylesheet = 'stable.css',
	stableVersion = 57;

if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > stableVersion) {
	stylesheet = 'canary.css';
}

xhr.open("GET", "/" + stylesheet, false);
xhr.send();
chrome.devtools.panels.applyStyleSheet(xhr.responseText);
