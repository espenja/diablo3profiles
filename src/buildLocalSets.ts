import { getDatabase } from "./db/getDatabase"
import { Items, Profile } from "./types/d3PlannerTypes"
import { ClassName, Item, Skill, FollowerSkill } from "./types/databasetypes"

type Follower = {
	name: string
	items: Array<Item>
	skills: Array<FollowerSkill>
}

type Kanai = {
	weapon?: Item
	armor?: Item
	jewelry?: Item
}

type LocalProfile = {
	name: string
	items: Array<Item>
	skills: Array<Skill>
	kanai: Kanai
	follower?: Follower
}

export const getItem = async (item: string): Promise<Item | undefined> => {
	const db = await getDatabase()
	return db.items.find((d) => d.id === item)
}

export const getItems = async (items: Items): Promise<Array<Item>> => {
	const db = await getDatabase()

	return Object.values(items)
		.map((value) => {
			const item = db.items.find((d) => d.id === value.id)

			if (!item) {
				return
			}

			return item
		})
		.filter((d) => d !== undefined) as Array<Item>
}

export const getSkills = async (_class: ClassName, skills: string[][]): Promise<Array<Skill>> => {
	const db = await getDatabase()

	return skills.map(([skillName]) => {
		return db.skills[_class][skillName]
	})
}

export const getFollowerSkills = async (_class: string, skills: string[]): Promise<Array<FollowerSkill>> => {
	const db = await getDatabase()

	return skills
		.map((skillName) => {
			if (!skillName) {
				return
			}
			return {
				name: db.followerSkills[skillName].name
			}
		})
		.filter((d) => d !== undefined) as Array<FollowerSkill>
}

export const getFollower = async (profile: Profile): Promise<Follower | undefined> => {
	if (!profile.follower) {
		return
	}

	return {
		name: profile.follower,
		items: await getItems(profile.followerItems),
		skills: await getFollowerSkills(profile.follower, profile.followerSkills)
	}
}

export const getKanai = async (profile: Profile): Promise<Kanai> => {
	const { kanai } = profile

	return {
		weapon: await getItem(kanai.weapon),
		armor: await getItem(kanai.armor),
		jewelry: await getItem(kanai.jewelry)
	}
}

export const buildLocalSets = async (profiles: Array<Profile>, namePrefix: string) => {
	const localProfiles: Array<LocalProfile> = []

	for (const profile of profiles) {
		const localProfile: LocalProfile = {
			name: `${namePrefix} ${profile.name}`,
			items: await getItems(profile.items),
			kanai: await getKanai(profile),
			skills: await getSkills(profile.class, profile.skills),
			follower: await getFollower(profile)
		}

		localProfiles.push(localProfile)
	}

	return localProfiles
}
