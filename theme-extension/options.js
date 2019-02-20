/**
 * Fetch the theme data (id, name, colors)
 */
const themeData = fetch("/themeData.json").then(res => res.json())

/**
 * Event handler that is called onClick
 * Saves selected theme option to chrome.storage
 *
 * @function setOptions
 */
function setOptions() {
	let selectValue = document.getElementById("theme").value
	chrome.storage.sync.set(
		{
			selectedThemeId: selectValue //store theme id from selected option
		},
		() => {
			// Update status to let user know options were saved.
			let status = document.getElementById("status")
			status.textContent = "Theme saved."
			status.classList.toggle("show")
			setTimeout(function() {
				status.classList.toggle("show")
				status.textContent = ""
			}, 1500)
		}
	)
}

/**
 * Creates an event handler function for each theme item, updates the select input value
 *
 * @function handleThemeSelect
 * @param {string} themeId
 * @returns {function}
 */
function handleThemeSelect(themeId) {
	// let count = 0;
	let t = themeId
	let themeSelect = document.getElementById("theme")

	return event => {
		// count++;
		let rows = Array.from(document.getElementsByClassName("row"))
		event.stopPropagation()
		rows.forEach(row => row.classList.remove("active"))

		if (!event.target === event.currentTarget) {
			return
		}

		event.currentTarget.classList.add("active")
		themeSelect.value = t
	}
}

/**
 * Retreive selected theme ID state using the preferences stored in chrome.storage.
 *
 * @function getOptions
 * @returns {promise} themeId
 *
 */
function getOptions() {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(
			{
				selectedThemeId: "zero-dark-matrix" // default theme id
			},
			storedItems => {
				resolve(storedItems.selectedThemeId)
			}
		)
	})
}

/**
 * Loop through the themeData JSON and render options into a clickable list with swatches
 *
 * @function renderOptions
 * @param {string} - current theme id in chrome.storage (ie. "zero-dark-matrix")
 */
function renderOptions(storage) {
	themeData.then(themeData => {
		themeData.forEach(theme => {
			let mainColors = theme.colors

			// get preview container
			let themePreview = document.getElementById("theme-preview")

			// create a row
			let themeRow = document.createElement("div")
			themeRow.classList = "row"

			// create a name container inside row
			let themeName = document.createElement("div")
			themeName.classList = "theme-name"
			themeName.appendChild(document.createTextNode(theme.name))

			// create a swatch container inside row
			let themeSwatches = document.createElement("div")
			themeSwatches.classList = "swatches"

			// create swatches
			mainColors.forEach(col => {
				let colorSwatch = document.createElement("span")
				colorSwatch.style.backgroundColor = col
				themeSwatches.appendChild(colorSwatch)
			})
			storage === theme.id ? themeRow.classList.add("active") : ""

			// attach parts together
			themeRow.appendChild(themeName)
			themeRow.appendChild(themeSwatches)
			themePreview.appendChild(themeRow)

			// attach an event listener to each theme row
			themeRow.addEventListener("click", handleThemeSelect(theme.id))
		})
	})
}

/**
 * Loop through the themeData JSON and render options into a select input
 *
 * @function renderSelect
 * @param {string} - current theme id in chrome.storage (ie. "zero-dark-matrix")
 */
function renderSelect(storage) {
	themeData.then(themeData => {
		let themeSelectWrap = document.getElementById("select-wrap")
		let themeSelect = document.createElement("select")
		themeSelect.id = "theme"

		themeData.forEach(theme => {
			// render select
			let option = document.createElement("option")
			let optionText = document.createTextNode(theme.name)
			option.value = theme.id
			option.appendChild(optionText)
			themeSelect.appendChild(option)
		})

		themeSelect.value = storage
		themeSelectWrap.appendChild(themeSelect)
	})
}

/**
 * Initialize the options page.
 *
 * @function initOptions
 */
function initOptions() {
	// wait for chrome.storage theme id to be returned, then provide it to the render functions
	getOptions().then(storage => {
		renderSelect(storage)
		renderOptions(storage)
	})
	document.getElementById("save").addEventListener("click", setOptions)
}

document.addEventListener("DOMContentLoaded", initOptions)
