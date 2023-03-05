import path from "path"

import fs from "fs-extra"

export const getConfig = () => {
	const projectRoot = path.resolve(__dirname)
	const cacheDir = path.resolve(projectRoot, ".cache")
	const databaseCache = path.resolve(cacheDir, "database.json")

	fs.ensureDir(cacheDir)

	return {
		projectRoot,
		cacheDir,
		databaseCache
	}
}
