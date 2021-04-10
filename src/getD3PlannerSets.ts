import got from "got"
import { getMaxRollVariants } from "./parseMaxroll"
import { D3Build, Profile } from "./types/d3PlannerTypes"
import { PromiseResolvedType } from "./types/PromiseResolveType"

export const getD3PlannerSets = async (setInfos: PromiseResolvedType<ReturnType<typeof getMaxRollVariants>>) => {
	const baseUrl = "https://maxroll.gg/d3planner-data/load/"
	const getSetUrl = (setId: string) => `${baseUrl}${setId}`
	const buildCache: Record<string, D3Build> = {}

	return await Promise.all(
		setInfos.map(async (d) => {
			if (!buildCache[d.buildId]) {
				buildCache[d.buildId] = JSON.parse((await got(getSetUrl(d.buildId))).body)
			}

			const build = buildCache[d.buildId]
			const profile: Profile = {
				...build.profiles[d.setId],
				name: d.setName
			}

			return profile
		})
	)
}
