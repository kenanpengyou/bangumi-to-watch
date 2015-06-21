# Bangumi to Watch
A web application that may be useful for a TV series follower.

## Key library and tools
* [Backbone](http://backbonejs.org/)
* [Backbone.localStorage](https://github.com/jeromegn/Backbone.localStorage)
* [jQuery](https://jquery.com/)
* [pepjs](https://github.com/jquery/PEP) (Using PointerEvents W3C sepc to handle multiple input types such as mouse and touch)
* [PostCSS](https://github.com/postcss/postcss)
* [Browserify](http://browserify.org/)
* [Browsersync](http://www.browsersync.io/)

## To start with this repo on your own
1. Clone this resp
2. Install dependencies
        npm install --global gulp
        npm install
3. Build dist files of 'pepjs' (Since `npm install pepjs` does not bring in its dist). See [npm pepjs](https://www.npmjs.com/package/pepjs) for more details.
        cd node_modules/pepjs
        npm install -g grunt-cli
        npm install
        grunt
4. Back to the root of this resp. 
    * To develop with local server (by browser), use `gulp dev` or `gulp`.
    * To make a release version, use `gulp release`.