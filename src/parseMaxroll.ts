import got from "got"
import colors from "colors"
import cheerio from "cheerio"

export const getMaxRollVariants = async (url: string) => {
	console.log(colors.green(`Loading build from ${colors.reset(url)}`))

	const page = await got(url)
	const $ = cheerio.load(page.body)
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
