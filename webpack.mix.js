const mix = require('laravel-mix');
const webpack = require('webpack');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
mix.copyDirectory('resources/assets/images', 'public/images');
mix.copyDirectory('resources/assets/media', 'public/media');
mix.webpackConfig({
    output: {
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    module: {
        /**
         * rule added to handle download csv
         */
        rules: [
            {
                test: /\.(csv|xlsx|xls)$/,
                loader: 'file-loader',
                options: {
                    name: `csv/[name].[ext]`
                }
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
});
