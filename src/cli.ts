/*

LOSS Command Line Interface

*/

import {readFileSync} from "fs"
import {parseFile} from "./FileParser"
import {parseDir} from "./DirParser"

import * as program from "commander"

program
.version('0.0.1')

program
.command('info')
.option('-d --db <path>', 'path to the database')
.action((options)=>{

	console.log("=== LOSS CLI tool info")
	console.log("DB path: ", options.db)

})

program
.command('parse <file>')
.option('-d --db <path>', 'path to the database')
.action(function(file: string, options){

	parseFile(file, options.db)
	.then((node) => {
		console.log(node)
	})
	.catch((err) => {
		throw new Error(err)
	})

})

program
.command('index')
.option('-d --db <path>', 'path to the database')
.action((options)=>{

	parseDir('/', options.db)
	.then((filePaths)=>{
		console.log(filePaths)
	})

})

program
.parse(process.argv)
