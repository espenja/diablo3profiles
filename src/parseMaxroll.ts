import got from "got"
import colors from "colors"
import { JSDOM } from "jsdom"

export const getMaxRollVariants = async (url: string) => {
	console.log(colors.green(`Loading build from ${colors.reset(url)}`))

	const page = await got(url)
	const dom = new JSDOM(page.body)
	const variants = dom.window.document.querySelectorAll(".advgb-tab-body-container") || []
	const setInfos = []

	for (const variant of variants) {
		if (!variant) {
			continue
		}
		const setName = variant.querySelector(".advgb-tab-body-header")?.textContent
		const build = variant.querySelector(".d3planner-build")
		const buildId = build?.getAttribute("data-d3planner-id")
		const setId = parseInt(build?.getAttribute("data-d3planner-set") as string)

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
