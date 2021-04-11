import path from "path"
import fs from "fs-extra"

import got from "got"
import colors from "colors"

import { getConfig } from "./getConfig"
import { getMaxRollVariants } from "./parseMaxroll"
import { D3Build, Profile } from "./types/d3PlannerTypes"
import { PromiseResolvedType } from "./types/PromiseResolveType"

const getSetUrl = (buildId: string) => `https://maxroll.gg/d3planner-data/load/${buildId}`

export const getFromCacheOrUpdate = async (buildId: string) => {
	const cachePath = path.resolve(getConfig().cacheDir, `${buildId}.json`)

	if (await fs.pathExists(cachePath)) {
		console.log(colors.green("Loading D3 Build from cache: ") + getSetUrl(buildId))
		return JSON.parse((await fs.readFile(cachePath)).toString())
	}

	console.log(colors.green("Loading D3 Build from web: ") + getSetUrl(buildId))

	const setData = (await got(getSetUrl(buildId))).body
	await fs.writeFile(cachePath, setData)

	return JSON.parse(setData)
}

export const getD3PlannerSets = async (setInfos: PromiseResolvedType<ReturnType<typeof getMaxRollVariants>>) => {
	const buildCache: Record<string, D3Build> = {}

	// Prefetch all builds from D3 or cache
	await Promise.all(
		[...new Set([...setInfos.map((d) => d.buildId)])].map(async (d) => {
			buildCache[d] = await getFromCacheOrUpdate(d)
		})
	)

	return await Promise.all(
		setInfos.map(async (d) => {
			const build = buildCache[d.buildId]
			const profile: Profile = {
				...build.profiles[d.setId],
				name: d.setName
			}

			return profile
		})
	)
}
