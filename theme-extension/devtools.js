const themeData = fetch("/themeData.json").then(res => res.json())

/**
 * Check if the user agent major version number matches or less than latest stable Chrome,
 * to determine if user should get stable or canary version of css
 *
 * @function isStable
 * @returns {boolean}
 */
function isStable() {
	return getStableVersion()
		.then(remoteLatestStable => {
			// request success: is Chrome less than or equal to latest stable version?
			return +/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] <= remoteLatestStable
		})
		.catch(() => {
			// request failure: always use stable version of css
			return true
		})
}

/**
 * Retrieve the latest stable Chrome version from remote JSON feed, managed by Chrome team.
 *
 * @function getStableVersion
 * @returns {promise} - resolve contains latest stable version for mac as {string}
 */
function getStableVersion() {
	return fetch("http://omahaproxy.appspot.com/all.json")
		.then(res => res.json())
		.then(data => {
			let mac = data.find(platforms => platforms.os === "mac")
			let versions = mac.versions
			let stable = versions.find(c => c.channel === "stable")
			let version = stable.version
			let majorVer = version.split(".")[0]
			return majorVer
		})
}

/**
 * Accepts a stylesheet filename, fetches it from extension root and loads it
 *
 * @function applyStyles
 * @param {string} selection
 */
function applyStyles(selection) {
	if (selection !== undefined) {
		fetch(`/${selection}`)
			.then(res => res.text())
			.then(styles => chrome.devtools.panels.applyStyleSheet(styles))
			.catch(e => console.error(e))
	}
}

/**
 * Setup and initialize the extension
 *
 * @function init
 */
function init() {
	chrome.storage.sync.get(
		{
			selectedThemeId: "zero-dark-matrix" // default
		},
		storedItems => {
			themeData.then(themeData => {
				let curThemeObj = themeData.find(i => i.id === storedItems.selectedThemeId)

				isStable().then(stableBool => {
					let stylesheet = stableBool
						? `${curThemeObj.id}.stable.css`
						: `${curThemeObj.id}.canary.css`

					applyStyles(stylesheet)
				})
			})
		}
	)
}

/**
 * Listen for updates in the options panel and re-init
 */
chrome.storage.onChanged.addListener((changes, namespace) => {
	init()
})

document.addEventListener("DOMContentLoaded", init)
