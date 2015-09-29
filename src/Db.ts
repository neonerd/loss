import NeDBDataStore = require("nedb")
import { join as pathJoin } from "path"

interface ILossDatabase {
	path : string,
	nodeDb : NeDBDataStore,
	edgeDb : NeDBDataStore
}

/**
 * Inits the database
 * @param  {string}
 * @return {LossDatabase}
 */
export function initDatabase(dbPath: string): ILossDatabase {

	return {
		path : dbPath,
		nodeDb : new NeDBDataStore({filename : pathJoin(dbPath, '.db_nodes'), autoload:true}),
		edgeDb : new NeDBDataStore({filename : pathJoin(dbPath, '.db_edges'), autoload:true})
	}

}

/**
 * Clears current data and rebuilds the database.
 * @param {LossDatabase}
 */
export function buildDatabase(db: ILossDatabase) {



}