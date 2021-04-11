import fs from "fs-extra"
import path from "path"
import webpack from "webpack"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

const projectRoot = path.resolve(__dirname, "../")

export default async () => {
	const tsConfigPath = path.resolve(projectRoot, "tsconfig.json")
	const outputPath = path.resolve(projectRoot, "dist")
	const statsOutput = path.resolve(projectRoot, ".stats")
	const entry = path.resolve(projectRoot, "src", "index.ts")

	console.log({
		tsConfigPath,
		outputPath,
		statsOutput,
		entry
	})

	await fs.ensureDir(outputPath)
	await fs.emptyDir(outputPath)

	const config: webpack.Configuration = {
		mode: "production",
		target: "node",

		entry: [entry],

		ignoreWarnings: [/critical dependency: the request of a dependency is an expression/i],

		node: {
			__dirname: false
		},

		output: {
			filename: "[name].js",
			chunkFilename: "[id].[chunkhash].js",
			path: outputPath
		},

		resolve: {
			extensions: [".js", ".jsx", ".ts", ".tsx"],
			plugins: [
				new TsconfigPathsPlugin({
					configFile: tsConfigPath
				})
			]
		},

		optimization: {
			splitChunks: false,
			runtimeChunk: false,
			minimize: true,
			usedExports: true,
			minimizer: [
				new TerserPlugin({
					parallel: 4,
					extractComments: true
				})
			]
		},

		plugins: [
			new ForkTsCheckerPlugin({
				async: true,
				typescript: {
					configFile: tsConfigPath
				}
			}),
			new BundleAnalyzerPlugin({
				analyzerMode: "static",
				reportFilename: path.resolve(statsOutput, "./report.html"),
				openAnalyzer: false
			})
		].filter(Boolean) as webpack.Configuration["plugins"], // Removes any undefined plugin entries

		module: {
			rules: [
				{
					exclude: /node_modules/,
					test: /\.[jt]sx?$/,
					use: [
						{
							loader: "babel-loader",
							options: {
								babelrc: false,
								presets: [
									[
										"@babel/preset-env", // Adds dynamic imports of the necessary polyfills (see .browserslistrc for spec)
										{
											useBuiltIns: "usage",
											corejs: { version: 3, proposals: true },
											debug: false,
											targets: {
												node: 14
											}
										}
									],
									[
										"@babel/preset-typescript",
										{
											onlyRemoveTypeImports: true
										}
									]
								]
							}
						}
					]
				}
			]
		}
	}

	return config
}
