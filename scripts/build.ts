import webpack from "webpack"
import getConfig from "./webpack.config"

const build = async (): Promise<void> => {
	console.log("Getting config")
	const config = await getConfig()

	await new Promise((resolve, reject) => {
		console.log("Building with webpack")

		webpack(config).run((error, stats) => {
			console.log("Finished")

			if (error) {
				console.error(error)
			}

			const statsJson = stats?.toJson()
			if (stats?.hasErrors()) {
				console.error(`Server errors during webpack build`)
				console.error(
					stats.toString({
						colors: true
					})
				)
				reject(statsJson?.errors)
				return
			}
			if (stats?.hasWarnings()) {
				console.warn(`Server warnings during build`)
				console.warn(
					stats.toString({
						colors: true
					})
				)
			}

			resolve(stats)
		})
	})
}

build().catch((err) => {
	console.error(err)
})
