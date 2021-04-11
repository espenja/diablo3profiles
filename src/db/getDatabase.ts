import got from "got"
import fs from "fs-extra"

import { getConfig } from "../getConfig"
import { Database } from "../types/databasetypes"

let database: Database

const getDatabaseFromCacheOrUpdate = async () => {
	const { databaseCache } = getConfig()

	if (await fs.pathExists(databaseCache)) {
		return (await fs.readFile(databaseCache)).toString()
	}

	const data = (await got("https://maxroll.gg/d3planner/data")).body
	await fs.writeFile(databaseCache, data)

	return data
}

export const getDatabase = async () => {
	if (database) {
		return database
	}

	const data = await getDatabaseFromCacheOrUpdate()
	database = JSON.parse(data) as Database

	return database
}
