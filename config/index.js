const path = require('path')

module.exports = {
	dev: {
		// Configuracion para los archivos estaticos que tendra la aplicacion desde el ambiente de desarrollo
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',

		// Configuracion del servidor de desarrollo
		host: 'localhost',
		port: 8000,
		proxyTable: {},

		autoOpenBrowser: false, // Abre el navegador cuando se levanta el servidor
		errorOverlay: true, // Lanza un error sobre la aplicación
		notifyOnErrors: true, // Notifica los errores en consola
		poll: false, //Tiempo de espera al recompilar,

		devtool: 'cheap-module-eval-source-map' // Muestra el codigo transpilado
	},

	build: {
		index: path.resolve(__dirname, '../dist/index.html'), // Template principal

		// Configuracion de los archivos estaticos en el ambiente de produccion
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',

		productionSourceMap: true,
		devtool: '#source-map', // Un SourceMap completo se emite como un archivo separado. Agrega un comentario de referencia al paquete para que las herramientas de desarrollo sepan dónde encontrarlo.

		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],

		bundleAnalyzerReport: process.env.npm_config_report // Debuelbe un reporte de la compilacion: npm run build --report=true
	}
}