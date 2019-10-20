// Webpack v4
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const extractCSS = new ExtractTextPlugin({
//  filename: "css/styles.css",//"[name].[contenthash].css",
//  disable: process.env.NODE_ENV === "development"
//});
module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sbertest.js',
    publicPath: 'dist/'
  },
  devServer:{
    overlay: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
                        presets: ['env', 'react']
                    }
        }
      },
      
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                  }
                ]  
            },
      
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader"]//, "autoprefixer-loader"]
        })
 
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
//        use: ExtractTextPlugin.extract(
//          {
//            fallback: 'style-loader',
//            use: ['css-loader']
//          })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("sbertest.css")
  ]
};