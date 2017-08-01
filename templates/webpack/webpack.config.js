var path = require('path');
var package = require('./package.json');
var fs = require('fs');
var complexEntry = {};
var commons = [];
var webpack = require('webpack');
var PROD = package.config.environment == 'dev' ? false : true;

var modules = fs.readdirSync(package.config.themeAssetsDir + "/javascript/block/");
modules.forEach(function (module) {
    var scopedModule = './' + package.config.themeAssetsDir + '/javascript/block/' + module; // uses .js extension
    var moduleName = 'block/' + module.replace(/\.js$/, '');
    if (scopedModule !== 'block/module' && scopedModule !== 'block/config') {
        complexEntry[moduleName] = scopedModule;
    }
});

var layoutModules = fs.readdirSync(package.config.themeAssetsDir + "/javascript/layout/");
layoutModules.forEach(function (module) {
    var scopedModule = './' + package.config.themeAssetsDir + '/javascript/layout/' + module; // uses .js extension
    var moduleName = 'layout/' + module.replace(/\.js$/, '');
    if (scopedModule !== 'layout/module' && scopedModule !== 'layout/config') {
        complexEntry[moduleName] = scopedModule;
    }
});

var commonsModules = fs.readdirSync(package.config.themeAssetsDir + "/javascript/global/");
commonsModules.forEach(function(module) {
    var scopedModule = './' + package.config.themeAssetsDir + '/javascript/global/' + module; // uses .js extension
    commons.push(scopedModule); // creates an array for

});

complexEntry['commons'] = commons; // push commons as an entry point

module.exports = {
    entry: complexEntry,
    output: {
        path:  __dirname + '/' + package.config.themeAssetsDir + "/build",
        filename: PROD ? "[name].min.js" : "[name].built.js"
    },
    // devtool: "source-map",
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.min.js'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ] : [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.built.js'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /bootstrap\/affix/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/alert/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/button/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/carousel/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/collapse/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/dropdown/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/modal/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/popover/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/scrollspy/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/tab/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/tooltip/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /bootstrap\/transition/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /ekko-lightbox/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /jquery\..*/,
                use: 'imports-loader?jQuery=jquery'
            },
            {
                test: /google-infobox/,
                use: 'imports-loader?$=jquery!exports?InfoBox'
            },
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        query: 'jQuery'
                    },
                    {
                        loader: 'expose-loader',
                        query: '$'
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'jquery': 'jquery/dist/jquery',
            'bootstrap': 'bootstrap-sass/assets/javascripts/bootstrap',
            'bootstrap-accessibility-plugin': 'bootstrap-accessibility-plugin/src/js'
        },
        modules: [package.config.themeAssetsDir + "/javascript", "node_modules"]
    }
};