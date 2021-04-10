import got from "got"
import { DiabloDatabase } from "../types/diabloDatabaseTypes"

let database: DiabloDatabase

export const getDatabase = async () => {
	if (database) {
		return database
	}

	const data = (await got("https://maxroll.gg/d3planner/data")).body
	database = JSON.parse(data) as DiabloDatabase

	return database
}
