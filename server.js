var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
      colors: true
  },
  proxy: {
      "/api/v1*": {
          target: "http://localhost:3001",
          secure: false
<<<<<<< HEAD
=======
      },
      ":3434*": {
          target: "ws://arwedhub:3434",
          secure: false
>>>>>>> fae3b29da2cf742e4a0b80cc8d220ab672056c57
      }
  }
}).listen(3000, "0.0.0.0", function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});
