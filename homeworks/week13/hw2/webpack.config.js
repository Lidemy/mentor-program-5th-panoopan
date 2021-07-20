/* eslint-disable */ 
const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js', // 程式入口點
	output: {
		filename: 'main.js', // 輸出的檔案名稱
		path: path.resolve(__dirname, 'dist'), // 要輸出的檔案路徑
		library: 'commentPlugin', // 打包
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist', // compile 之後的檔案要放哪裡
	},
	module: {
	    rules: [
		  {
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
			  loader: 'babel-loader',
			  options: {
				presets: ['@babel/preset-env']
			  }
			}
		  }, // babel-loader
		  {
			test: /\.s[ac]ss$/i,
			use: [
			  // Creates `style` nodes from JS strings
			  "style-loader",
			  // Translates CSS into CommonJS
			  "css-loader",
			  // Compiles Sass to CSS
			  "sass-loader",
			],
		  }, // sass-loader
	    ],
	}
};
