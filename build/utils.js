const path = require('path')
const config = require('../config')

const ExtractTextPlugin = require('extract-text-webpack-plugin') // Extrae el texto de un paquete o varios paquetes en archivos separados

/**
 * Retorna el directorio de assets segun el sistema operativo Portable Operating System Interface - Posix 
 */
exports.assetsPath = _path => {
	const assetsSubDirectory = process.env.NODE_ENV === "produccion"? config.build.assetsSubDirectory : config.dev.assetsSubDirectory

	return path.posix.join(assetsSubDirectory, _path)
}

/**
 * Se encarga de generar los loaders que se cargaran segun el loader que se envie. Recibe la configuracion.
 * El objeto que retorna es un llamado a una funcion interna que genera los loaders. Este objeto contiene los loaders que se van a cargar. Para poder generar un loader, se le pasa el loader y alguna configuracion:
 * return {
 *     less: generateLoaders('less'),
 *     saas: generateLoaders('saas', { indentedSyntax: true })
 * }
 */
exports.cssLoaders = options => {
	options = options || {}

	const cssLoader = {
		loader: 'css-loader',
		options: {
			sourceMap: options.sourceMap
		}
	}

	/**
	 * Se encarga de generar el loader para el paquete que se desea cargar. recibe el loader y alguna configuracion propia del loader, luego se encarga de generar un array con todos los loaders y se los entrega a webpack
	 */
	function generateLoaders( loader, loaderOptions ){
		const loaders = [cssLoader]

		if( loader ){
			loader.push({
				loader: `${loader}-loader`,
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			})
		}

		if( options.extract ){
			return ExtractTextPlugin.extract({
				use: loaders,
				fallback: "style-loader",
			})
		}else{
			return ['style-loader'].concat(loaders)
		}
	}

	return {
		css: generateLoaders()
	}
}

/**
 * Se encarga de crear los loaders que usara la aplicacion para cargar los estilos. Recibe un objeto que contiene si mapeara todos los archivos de estilo que existan y retorna un array que contiene los loaders que usara la aplicacion para cargar los css.
 */
exports.styleLoaders = configLoader => {
	let output = []
	const loaders = exports.cssLoaders(configLoader)

	for( let extension in loaders ){
		let loader = loaders[extension]
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			use: loader
		})
	}

	return output
}

exports.createNotifierCallback = () => {
	const nofifier = require('node-notifier')

	return ( severity, errors ) => {
		if( severity !== 'error' ) return;

		const error = errors[0]
		const filename = error.file && error.file.split('!').pop()

		notifier.notify({
			title: packageConfig.name,
			message: `${severity}: ${error.name}`,
			subtitle: filename || '',
		})
	}
}