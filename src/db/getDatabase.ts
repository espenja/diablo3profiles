import got from "got"
import { Database } from "../types/databasetypes"

let database: Database

export const getDatabase = async () => {
	if (database) {
		return database
	}

	const data = (await got("https://maxroll.gg/d3planner/data")).body
	database = JSON.parse(data) as Database

	return database
}
