var dev = process.env.NODE_ENV !== "production";
var path = require('path');
var webpack = require('webpack');
 
var entry = [];
entry.push("./src/index");
if(dev) {
    entry.push("webpack-dev-server/client?http://localhost:3000");
    entry.push("webpack/hot/only-dev-server");
}

module.exports = {
    devtool: "eval",
    entry: entry,
    output: { 
        path: __dirname + "/build" ,
        filename: 'bundle.js',
        publicPath: "/build/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
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
            {
                test: /\.png$/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            },
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            { test: /\.css$/, loader: "style!css" },
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    },
};
