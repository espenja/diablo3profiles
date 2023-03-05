import path from "path"

import colors from "colors"
import fs from "fs-extra"
import prompt from "prompt"

import { getD3PlannerVariants } from "./getD3PlannerVariants"
import { getGuideVariant } from "./getGuideVariant"
import { getLocalVariants } from "./getLocalVariants"
import { Guide, LocalBuildVariant } from "./types/guide"

const start = async () => {
	const guidesPath = path.resolve(__dirname, "guides.json")
	const guidesExist = await fs.pathExists(guidesPath)

	if (!guidesExist) {
		const example = [
			{
				url: "https://maxroll.gg/guides/firebird-mirror-image-wizard-guide",
				name: "Firebird Mirror Image"
			}
		]

		console.log("Please create a guides.json file in the same directory as the program")
		console.log("Example file:")
		console.log(colors.green(JSON.stringify(example, undefined, 2)))
		process.exit(0)
	}

	const guides = JSON.parse(fs.readFileSync(guidesPath, { encoding: "utf8" })) as Array<Guide>
	const buildVariants: Array<LocalBuildVariant> = []

	for (const guide of guides) {
		const variants = await getGuideVariant(guide.url, guide.ignoredVariants)
		const d3PlannerVariants = await getD3PlannerVariants(variants)
		const localVariants = await getLocalVariants(d3PlannerVariants, guide.name)
	}
}

start().catch((err) => {
	console.error(err)
})
