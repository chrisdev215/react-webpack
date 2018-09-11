const path = require('path')
const config = require('../config')

exports.assetsPath = _path => {
	const assetsSubDirectory = process.env.NODE_ENV === "produccion"? config.build.assetsSubDirectory : config.dev.assetsSubDirectory

	return path.posix.join(assetsSubDirectory, _path)
} // Retorna el directorio de assets segun el sistema operativo Portable Operating System Interface - Posix

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