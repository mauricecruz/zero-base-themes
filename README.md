# Zero Base Themes

An assortment of Chrome Devtools themes that use the Zero Base Template.

# Contributing

Zero Base Themes is built on LESS. Grunt is used to listen for changes to LESS files and generates CSS. This means [Node](http://nodejs.org/) is required.

## Getting Started

1.  Clone this repo: `git clone https://github.com/mauricecruz/zero-base-themes.git`.

2.  Install dependencies: `npm install`.

3.  To use an existing theme: `grunt`. (If you're going to work on your own theme: `grunt watch` to listen for changes).

4.  `Chrome > Preferences... > Extensions > DevTools Theme: Zero Dark Matrix = Enabled`

5.  chrome://flags (make sure `Enable Developer Tools experiments` is enabled).

6.  In Chrome Dev Tools > Settings (cog icon or `Shift+?`) > Experiments > Allow custom UI themes.

7.  Close and reopen the dev tools.

## Changing Themes

The theme selector is available here: `Window > Extensions > DevTools Theme: Zero Dark Matrix > Details > Extension Options` or click the icon in the address bar and select `Options`.

Select a theme and hit save. Re-open dev tools.

## Contributing to Template Source

All template files are located in the `/less` directory. Files beginning with an `_` indicate template partials. Any addition/removal of template partials should be reflected in the build file found in `less/theme-builds`.


## Adding themes

1. Copy `/themes/_theme-template.less` and modify color values accordingly. Rename the file and save in the `/themes` directory.

2. Add the theme to `/themeData.json` using the following format (colors represents the main colors of the theme and will appear as swatches in the options panel):
    ```json
    {
		"id": "custom-theme-name",
		"name": "Custom Theme Name",
		"colors": ["#f0874f", "#49a5d2", "#88aed5", "#e3b959", "#89f5a2", "#49a5d2"]
	}
    ```
3. Add a new "theme-build" to `less/theme_builds` for stable and canary versions of Chrome

    ```less
    @import "less/config";
    @import "../../themes/custom-theme-name";
    @import "less/partials/_build-stable";
    @import "less/partials/_canary";
    ```
4. Complile LESS files using `grunt` and `load unpacked` extension in Chrome.

# Alternatives

Chrome now has an option to let you select different themes via Settings > Appearance > Theme: Light/Dark.

## Additional Resources

Blog post and screencast showing how to get up and running and create your own theme as well http://s10wen.com/blog/2014/03/12/chrome-dev-tools-theming-with-zero-base-themes/
