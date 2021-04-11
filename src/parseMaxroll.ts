import path from "path"
import fs from "fs-extra"

import got from "got"
import colors from "colors"
import cheerio from "cheerio"

import { getConfig } from "./getConfig"

const getFromCacheOrUpdate = async (url: string) => {
	const { cacheDir } = getConfig()

	const buildName = `${url.substr(url.lastIndexOf("/"))}.html`
	const cachePath = path.join(cacheDir, buildName)

	if (await fs.pathExists(cachePath)) {
		console.log(colors.green(`Loading Maxroll Guide from cache: ${colors.reset(url)}`))
		return (await fs.readFile(cachePath)).toString()
	}

	console.log(colors.green(`Loading Maxroll Guide from web: ${colors.reset(url)}`))
	const contents = (await got(url)).body
	await fs.writeFile(cachePath, contents)
	return contents
}

export const getMaxRollVariants = async (url: string) => {
	const html = await getFromCacheOrUpdate(url)
	const $ = cheerio.load(html)
	const variants = $(".advgb-tab-body-container")
	const setInfos = []

	for (const variant of variants) {
		if (!variant) {
			continue
		}

		const setName = $(".advgb-tab-body-header", variant).text()
		const build = $(".d3planner-build", variant)
		const buildId = build.attr("data-d3planner-id")
		const setId = parseInt(build.attr("data-d3planner-set") as string)

		if (!setName || !build || !buildId) {
			continue
		}

		setInfos.push({
			setName,
			buildId,
			setId
		})
	}

	return setInfos
}
