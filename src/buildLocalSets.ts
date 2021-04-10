import { getDatabase } from "./db/getDatabase"
import { Profile } from "./types/d3PlannerTypes"

export const buildLocalSets = async (profiles: Array<Profile>) => {
	const db = await getDatabase()

	for (const profile of profiles) {
		const items = profile.items

		Object.entries(items).map(([_, value]) => {
			console.log(db.items.find((d) => d.id === value.id).name)
		})
	}
}
