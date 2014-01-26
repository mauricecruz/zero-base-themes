# Zero Base Themes

An assortment of Chrome Devtools theme that use the Zero Base Template.


# Contributing

Zero Base Themes is built on LESS. Grunt is used to listen for changes to LESS files and generates CSS. This means [Node](http://nodejs.org/) is required.


## Getting Started

1. Clone this repo: `git clone https://github.com/mauricecruz/zero-base-themes.git`

2. Install dependencies: `npm install`

3. [Update Stable path](https://github.com/mauricecruz/zero-base-themes/blob/master/Gruntfile.js#L15) in Gruntfile to point to your profile's User Stylesheet directory. e.g. for mac `'/Users/simonowen/Library/Application\ Support/Google/Chrome/Default/User\ StyleSheets/Custom.css': 'less/stable/build.less'`

4. Listen for changes: `grunt watch`


## Contributing to Template Source

All template files are located in the `/less` directory. Files beginning with an `_` indicate template partials. They are imported via `build.less`. Any addition/removal of template partials should be reflected in the build file.


## Contributing Themes

Copy `/themes/_theme-template.less` and modify color values accordingly. Rename the file and save in the `/themes` directory.  Update `build.less` with your theme name.


# About Canary

As of Version v. **33.0.1726.0**, themes only work via extensions and the developer tools experiments.

There is a [thread detailing how this method came about.](https://code.google.com/p/chromium/issues/detail?can=4&start=0&num=100&q=&colspec=ID%20Pri%20M%20Iteration%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified&groupby=&sort=&id=318566).  Feel free to voice your opinions there.
