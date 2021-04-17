import path from "path"
import fs from "fs-extra"

import got from "got"
import colors from "colors"
import cheerio from "cheerio"

import { getConfig } from "./getConfig"
import { getDatabase } from "./db/getDatabase"

const getAlpha = (str: string) => {
	return str.toLowerCase().replace(/[^a-z0-9]/g, "")
}

const getRealItemName = async (itemName: string) => {
	const database = await getDatabase()

	return database.items.find((d) => {
		const alphaItemName = getAlpha(d.name)
		const itemNameAlpha = getAlpha(itemName)

		if (alphaItemName === itemNameAlpha) {
			return true
		}
	})?.name
}

const getFromCacheOrUpdate = async (url: string, cache = true) => {
	const { cacheDir } = getConfig()

	const buildName = `${url.substr(url.lastIndexOf("/"))}.html`
	const cachePath = path.join(cacheDir, buildName)

	if ((await fs.pathExists(cachePath)) && cache) {
		console.log(colors.green(`Loading Maxroll Guide from cache: ${colors.reset(url)}`))
		return (await fs.readFile(cachePath)).toString()
	}

	console.log(colors.green(`Loading Maxroll Guide from web: ${colors.reset(url)}`))
	const contents = (await got(url)).body
	await fs.writeFile(cachePath, contents)
	return contents
}

const getStatPriorities = async ($: cheerio.Root) => {
	const accordions = $(".advgb-accordion-item")
	let statPrioritiesTab: cheerio.Element

	for (const accordion of accordions) {
		const header = $("h4", accordion).text()

		if (header.toLowerCase().includes("stat priorities")) {
			statPrioritiesTab = accordion
			break
		}
	}

	if (statPrioritiesTab! === undefined) {
		return {}
	}

	const tableBody = $("tbody", statPrioritiesTab)
	const rows = $("tr", tableBody).slice(1)

	const itemStatPriorities: Record<string, Array<string>> = {}

	for (const row of rows) {
		const columns = $("td", row).slice(1)

		if (columns.length !== 2) {
			continue
		}

		const [itemColumn, statPriorityColumn] = columns
		const items: string[] = []

		for (const item of $(".d3planner-item", itemColumn)) {
			const itemName = $(item).text()
			const realItemName = await getRealItemName(itemName)
			if (realItemName) {
				items.push(realItemName)
			}
		}

		$(statPriorityColumn).find("br").replaceWith("\n")
		const statPriorities = $(statPriorityColumn).text().split("\n")

		items.forEach((d) => (itemStatPriorities[d] = statPriorities))
	}

	return itemStatPriorities
}

export const getMaxRollVariants = async (url: string, ignoredVariants: string[]) => {
	const html = await getFromCacheOrUpdate(url)
	const $ = cheerio.load(html)
	const variants = $(".advgb-tab-body-container")
	const variantInfo = []

	for (const variant of variants) {
		if (!variant) {
			continue
		}

		const variantName = $(".advgb-tab-body-header", variant).text()

		if (ignoredVariants?.map((d) => d.toLowerCase()).includes(variantName.toLowerCase())) {
			continue
		}

		const build = $(".d3planner-build", variant)
		const buildId = build.attr("data-d3planner-id")
		const variantId = parseInt(build.attr("data-d3planner-set") as string)

		if (!variantName || !build || !buildId) {
			continue
		}

		variantInfo.push({
			variantName: variantName,
			buildId,
			variantId
		})
	}

	const statPriorities = await getStatPriorities($)

	return variantInfo.map((d) => ({
		...d,
		statPriorities
	}))
}
