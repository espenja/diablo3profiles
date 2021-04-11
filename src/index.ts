import { buildLocalSets } from "./buildLocalSets"
import { getD3PlannerSets } from "./getD3PlannerSets"
import { getMaxRollVariants } from "./parseMaxroll"

const start = async () => {
	const variants = await getMaxRollVariants("https://maxroll.gg/guides/firebird-mirror-image-wizard-guide")
	const d3Sets = await getD3PlannerSets(variants)
	const localSets = await buildLocalSets(d3Sets, "Firebird Mirror Image")

	console.log(JSON.stringify(localSets))
}

start().catch((error) => {
	console.error(error)
})
