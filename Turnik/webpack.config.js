/* eslint-disable no-irregular-whitespace */
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pages`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith(".html"));

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCSSAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ];
    }

    return config;

};


const filename = ext => isDev ? `${PATHS.assets}${ext}/[name].${ext}` : `${PATHS.assets}${ext}/[name].[contenthash].${ext}`

const imageLoaders = () => {
    const loaders = [{loader: 'file-loader', options: {publicPath:'../images', outputPath: `${PATHS.assets}/images`, name: `[name].[ext]` }}]

    if (isProd) {
        loaders.push(
            {
                loader:'image-webpack-loader', 
                options: {
                    mozjpeg: {progressive: true, quality: 80},
                    pngquant: {quality: [0.65, 0.90], speed: 4},
                    gifsicle: {interlaced: false},
                    // the webp option will enable WEBP - not friendly with IE11
                    // webp: {quality: 80},
                    svgo: {plugins:[{removeViewBox: false}]}
                }
            }
        )
    }

    return loaders;
}

const cssLoaders = extra => {
    const loaders = [
        {loader: MiniCssExtractPlugin.loader}, 
        {loader: 'css-loader', options: {sourceMap: isDev}},
        {
            loader: 'postcss-loader', 
            options: {
                plugins: [
                    require('postcss-custom-properties')({
                        preserve: true
                    }),
                    require('autoprefixer')({
                        grid: 'autoplace'
                    })
                ], 
                sourceMap: isDev
            }
        },
        {loader: 'group-css-media-queries-loader', options: {sourceMap: isDev}}
    ];

    if (extra) {
        loaders.push(extra);
    }

    return loaders;
};

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader', 
        options: babelOptions()
    }];

    if (isDev) {
        loaders.push('eslint-loader');
    }

    return loaders;
}

const babelOptions = preset => {
    const options = {
        presets: ['@babel/preset-env'],
        // plugins: ['@babel/plugin-proposal-class-properties'] 
    };

    if (preset) {
        options.presets.push(preset);
    }

    return options;

};


module.exports = {
    optimization: optimization(),
    devtool: isDev ? 'source-map' : '',
    entry: {
        // app: ['@babel/polyfill', PATHS.src]
        app: PATHS.src
    },
    output: {
        filename: filename('js'),
        path: PATHS.dist,
        // publicPath: '/'
    },
    devServer: {
        port: 4200,
        hot: isDev,
        host: '192.168.0.104'
    },
    plugins: [
        new MiniCssExtractPlugin({filename: filename('css')}),

        ...PAGES.map(
            page =>
              new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page}`,
                minify:  {collapseWhitespace: isProd}
              })
          ),
        
        // new SvgSpriteLoaderPlugin({plainSprite: true}),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {test: /\.css$/, use: cssLoaders()},
            {test: /\.(scss|sass)$/, use: cssLoaders({loader: "sass-loader",options: {sourceMap: isDev}})},
            {test: /\.(png|jpg|jpeg|gif|webp|svg)$/, use: imageLoaders()},
            // {test: /\.svg$/, use: [{loader: 'svg-sprite-loader', options: {extract: true, spriteFilename: './assets/images/icons.svg'}}]},
            {test: /\.(ttf|woff|woff2|eot)$/, use: [{loader: 'file-loader', options: {publicPath:'../fonts', outputPath: `${PATHS.assets}/fonts`, name: `[name]/[name].[ext]`}}]},
            {test: /\.(ico|txt|xml|csv|php)$/, use: [{loader: 'file-loader', options: {name: '[name].[ext]'}}]},
            {test: /\.js$/, exclude: /node_modules/, use: jsLoaders()},
            // {test: /\.ts$/, exclude: /node_modules/, loader: {loader: 'babel-loader', options: babelOptions('@babel/preset-typescript')}},
            // {test: /\.jsx$/,exclude: /node_modules/, loader: {loader: 'babel-loader', options: babelOptions('@babel/preset-react')}}
        ]
    }
}