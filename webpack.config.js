var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    devtool: "eval",
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index',
    ],
    output: { 
        path: __dirname + "/build" ,
        filename: 'bundle.js',
        publicPath: "/build/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loaders: ["react-hot", 'babel'],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            { test: /\.css$/, loader: "style!css" },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },
};
