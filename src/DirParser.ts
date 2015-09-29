import { readdir, stat } from "fs"
import { join } from "path"

export function parseDir(dir: string, dbPath: string): Promise<string[]> {

	return new Promise((resolve, reject) => {

		let filePaths: string[] = []

		readdir(join(dbPath, dir), (err, files)=>{

			let promises: Promise<string[]>[] = []

			files.map((file)=>{

				promises.push(new Promise((resolve, reject) => {
					stat(join(dbPath, dir, file), (err, stat)=>{
						if(stat.isFile() && file[0] != '.') {
							resolve([join(dir, file)])
						} else {
							if(stat.isDirectory()) {
								resolve(parseDir(join(dir, file), dbPath))
							} else {
								resolve([])
							}
						}
					})
				}))

			})

			Promise.all(promises)
			.then((results) =>{

				results.map((result)=>{
					filePaths = filePaths.concat(result)
				})

				resolve(filePaths)

			})
			
		})

	})

	

}