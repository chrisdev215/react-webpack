const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge') // Une dos o mas archivos de configuracion de webpack concatenandolos
const portfinder = require('portfinder') // Encuentra un puerto aleatorio en la maquina actual

const utils = require('./utils')
const config = require('../config') // La configuracion de los entornos de desarrollo y produccion
const baseWebpackConfig = require('./webpack.base.config')

const ExtractTextPlugin = require('extract-text-webpack-plugin') // Extrae el texto de un paquete o varios paquetes en archivos separados
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


const HOST = process.env.HOST
const PORT = Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		],
	},
	devtool: config.dev.devtool,

	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [
				{
					from: /.*/,
					to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
				}
			]
		},
		hot: true,
		contentBase: false,
		compress: true,
		host: HOST || config.dev.host,
		port: PORT || config.dev.port,
		open: config.dev.autoOpenBrowser,
		overlay: config.dev.errorOverlay? { warnings: false, errors: true } : false,
		publicPath: config.dev.assetsPublicPath,
		proxy: config.dev.proxyTable,
		quiet: true,
		watchOptions: {
			poll: config.dev.poll
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': require('../config/dev.env')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),

		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../static'),
				to: config.dev.assetsSubdirectory,
				ignore: ['.*']
			}
		])
	]
})

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port;
	portfinder.getPort((err, port) => {
		if (err){ 
			reject(err)
		} else {
			process.env.PORT = port

			devWebpackConfig.devServer.port = port
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSuccessInfo: {
					messages: [`La aplicacion esta corriendo en el la direccion: http://${devWebpackConfig.devServer.host}:${port}`]
				},
				onErrors: config.dev.nofityOnErrors? utils.createNotifierCallback() : undefined
			}))

			resolve(devWebpackConfig)
		}
	})
})
