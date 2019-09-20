const HTMLWebpackPlugin=require('html-webpack-plugin');
const HTMLWebpackPluginConfig=new HTMLWebpackPlugin({
	template:__dirname+'/app/index.html',
	filename:'index.html',
	inject:'body'
})

let config = {
	entry:__dirname+'/app/index.js',
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader'
			},
			{
				test:/\.css$/,
				loader:['style-loader','css-loader']
			}
		]
	},
	output:{
		filename:'bundle.js',
		path:__dirname+'/'
	},
	plugins:[HTMLWebpackPluginConfig]
}

module.exports=config;