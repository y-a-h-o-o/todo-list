const path = require("path");
const html_plugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js", 
	devtool: "eval-source-map",
	devServer: {
		static: "./dist",
		open: true, 
	},
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"), 
		clean: true, 
	},
	plugins: [
		new html_plugin({
			template: "./src/template.html", 
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i, 
				use: ["style-loader", "css-loader"],
			},	
		],
	},
}; 
