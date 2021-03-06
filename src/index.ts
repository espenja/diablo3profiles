import fs from "fs-extra"
import path from "path"
import prompt from "prompt"
import colors from "colors"

import { buildLocalVariants, LocalBuildVariant } from "./buildLocalVariants"
import { getD3PlannerVariants as getD3PlannerVariants } from "./getD3PlannerVariant"
import { getMaxRollVariants } from "./parseMaxroll"

import { Item } from "./types/databasetypes"

type ItemSearch = {
	profileName: string
	class: string
	kanai?: boolean
	type: "player" | "follower"
	items: Array<Item>
	statPriorities?: Record<string, Array<string>>
}

const findInString = (str1: string, str2: string) => {
	return str1.toLowerCase().includes(str2.toLowerCase())
}

const find = (search: string, profiles: Array<LocalBuildVariant>) => {
	const found: Array<ItemSearch> = []

	for (const profile of profiles) {
		const items: Array<Item> = profile.items.filter((d) => findInString(d.name, search))

		found.push({
			profileName: profile.name,
			class: profile.class,
			items,
			type: "player",
			statPriorities: profile.statPriorities
		})

		const kanaiItems = Object.values(profile.kanai)
			.filter((value) => value && findInString(value?.name, search))
			.filter((d) => d !== undefined) as Array<Item>

		found.push({
			profileName: profile.name,
			class: profile.class,
			items: kanaiItems,
			type: "player",
			kanai: true
		})

		if (!profile.follower) {
			continue
		}

		const followerItems: Array<Item> = profile.follower.items.filter((d) => findInString(d.name, search))

		found.push({
			profileName: profile.name,
			class: profile.follower.name,
			items: followerItems,
			type: "follower"
		})
	}

	return found
}

const createStatPrioritiesString = (statPriorities: Record<string, Array<string>> | undefined, item: Item) => {
	if (!statPriorities) {
		return ""
	}

	if (!statPriorities[item.name]) {
		return
	}

	return `(${colors.white(statPriorities[item.name].join(", "))})`
}

const iterateAndPrintItems = (search: string, itemSearches: ItemSearch[]) => {
	itemSearches.forEach((profile) => {
		const itemsByProfiles = profile.items
			.map((item) => {
				const itemName = item.name
				const reg = new RegExp(search, "i")
				const f = itemName.match(reg)![0]
				let colored = `${colors.green(
					itemName.substr(0, itemName.indexOf(f)) +
						colors.red(colors.bold(f)) +
						colors.green(itemName.substr(itemName.indexOf(f) + f.length))
				)}`

				if (profile.items.length === 1) {
					const statPrioritiesString = createStatPrioritiesString(profile.statPriorities, item)
					if (statPrioritiesString) {
						colored += ` ${statPrioritiesString}`
					}
				}

				return {
					profileName: profile.profileName,
					item: colored,
					class: profile.class,
					kanai: profile.kanai || false
				}
			})
			.reduce((prev, curr) => {
				if (!prev[curr.profileName]) {
					prev[curr.profileName] = {
						class: profile.class,
						items: [],
						kanai: profile.kanai || false
					}
				}

				prev[curr.profileName].items.push(curr.item)
				return prev
			}, {} as Record<string, { items: Array<string>; class: string; kanai: boolean }>)

		Object.keys(itemsByProfiles)
			.sort()
			.forEach((profileName) => {
				const d = itemsByProfiles[profileName]
				const cls = `(${colors.blue(d.class)})`
				const kanai = d.kanai ? ` (${colors.magenta("kanai")})` : ""
				const clsKanai = `${cls}${kanai}:`
				const items = `[${d.items.join(", ")}]`

				console.log(`${profileName} ${clsKanai} ${items}`)
			})
	})
}

const prettyFind = (search: string, profiles: Array<LocalBuildVariant>) => {
	console.log(colors.green(`Searching for ${colors.white('"')}${colors.magenta(search)}${colors.white('"')}`))
	console.log()

	const result = find(search, profiles)

	console.log(colors.green("Player:"))
	const playerProfiles = result.filter((profile) => profile.type === "player")
	iterateAndPrintItems(search, playerProfiles)

	console.log()

	console.log(colors.green("Follower:"))
	const followerProfiles = result.filter((profile) => profile.type === "follower")
	iterateAndPrintItems(search, followerProfiles)
}

const askUser = (profiles: LocalBuildVariant[]) => {
	console.log()
	prompt.get(["search"], (err, result: any) => {
		if (err) {
			console.error(err)
			process.exit(1)
		}

		prettyFind(result.search, profiles)
		console.log("--------------------")
		askUser(profiles)
	})
}

type Guide = {
	url: string
	name: string
	ignoredVariants: string[]
}

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

	const guides = JSON.parse(fs.readFileSync(path.resolve(__dirname, "guides.json"), { encoding: "utf-8" })) as Guide[]

	const localBuildVariants: LocalBuildVariant[] = []

	for (const guide of guides) {
		const variants = await getMaxRollVariants(guide.url, guide.ignoredVariants)
		const d3Variant = await getD3PlannerVariants(variants)
		const localVariants = await buildLocalVariants(d3Variant, guide.name)
		localVariants.forEach((d) => localBuildVariants.push(d))
	}

	askUser(localBuildVariants)
}

start().catch((error) => {
	console.error(error)
})
