var path = require('path');
var package = require('./package.json');
var fs = require('fs');
var complexEntry = {};
var commons = [];
var webpack = require('webpack');
var PROD = package.config.environment == 'dev' ? false : true;

var modules = fs.readdirSync(package.config.themeAssetsDir + "/javascript/block/");
modules.forEach(function (module) {
    var scopedModule = 'block/' + module.replace(/\.js$/, '');
    if (scopedModule !== 'block/module' && scopedModule !== 'block/config') {
        complexEntry[scopedModule] = scopedModule;
    }
});

var layoutModules = fs.readdirSync(package.config.themeAssetsDir + "/javascript/layout/");
layoutModules .forEach(function (module) {
    var scopedModule = 'layout/' + module.replace(/\.js$/, '');
    if (scopedModule !== 'layout/module' && scopedModule !== 'layout/config') {
        complexEntry[scopedModule] = scopedModule;
    }
});

var commonsModules = fs.readdirSync(package.config.themeAssetsDir + "/javascript/global/");
commonsModules.forEach(function(module) {
    var scopedModule = 'global/' + module; // uses .js extension
    commons.push(scopedModule); // creates an array for

});

complexEntry['commons'] = commons; // push commons as an entry point

module.exports = {
    entry: complexEntry,
    output: {
        path: package.config.themeAssetsDir + "/build",
        filename: PROD ? "[name].min.js" : "[name].built.js"
    },
    // devtool: "source-map",
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.min.js'}),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ] : [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.built.js'}),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
            {test: /bootstrap\/affix/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/alert/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/button/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/carousel/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/collapse/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/dropdown/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/modal/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/popover/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/scrollspy/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/tab/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/tooltip/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\/transition/, use: 'imports-loader?jQuery=jquery'},
            {test: /ekko-lightbox/, use: 'imports-loader?jQuery=jquery'},
            {test: /bootstrap\-accessibility\-plugin\/src\/js\/functions/,
                use: 'imports-loader?$=jquery!exports?uniqueId,removeMultiValAttributes,focusable,visible'},
            {test: /bootstrap\-accessibility\-plugin\/src\/js\/(carousel|collapse|dropdown|modal|tab)/,
                use: 'imports-loader?$=jquery&_BAPF=bootstrap-accessibility-plugin/src/js/functions&uniqueId=>_BAPF.uniqueId&removeMultiValAttributes=>_BAPF.removeMultiValAttributes&focusable=>_BAPF.focusable&visible=>_BAPF.visible'},
            {test: /jquery\..*/, use: 'imports-loader?jQuery=jquery'},
            {test: require.resolve('jquery'), use: 'expose-loader?jQuery!expose?$'}
        ]
    },
    resolve: {
        alias: {
            'jquery': 'jquery/dist/jquery',//from node_modules
            'bootstrap': 'bootstrap-sass/assets/javascripts/bootstrap',
            'bootstrap-accessibility-plugin': 'bootstrap-accessibility-plugin/src/js'
        },
        modulesDirectories: [package.config.themeAssetsDir + "/javascript", "node_modules"]
    }
};