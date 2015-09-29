import { ILossNode } from "./interfaces/Loss"
import { parseNode } from "./NodeParser"
import { readFile, stat } from "fs"
import { join, dirname } from "path"
import { createHash } from "crypto"

/**
 * Parses a file (relative to the main DB path) into a Loss Node
 * @param  {string}
 * @param  {string}
 * @return {ILossNode}
 */
export function parseFile(relativePath: string, dbPath: string): Promise<ILossNode> {
	return new Promise((resolve, reject) => {

		let path = join(dbPath, relativePath)
		readFile(path, 'utf-8', (err, data) => {

			if(err) {reject(err)}
			else {
				let node = parseNode(data)
				node.path = join(dirname(relativePath), node.term.slug)

				let hash = createHash('sha1')
				hash.update(node.path)
				node.id = hash.digest('hex')

				node.system.filePaths = {
					absolute : path,
					relative : relativePath
				}

				stat(path, (err,stats) => {
					node.system.modified = stats.mtime
					resolve(node)
				})
			}

		})

	})
}