import { markdown } from "markdown"
import * as cheerio from "cheerio"

import { ILossTerm } from "./interfaces/Loss"

import { createSlug } from "./Strings"


function parseName(html: string): string {

	let $ = cheerio.load(html)

	if($('h1').length > 1)
		throw new Error("Parser error: Too many H1 headings!")

	if($('h1').length < 1)
		throw new Error("Parser error: No H1 heading!")

	return $('h1').text()

}

export function parseTerm(term: string): ILossTerm {

	let html = markdown.toHTML(term)
	let name = parseName(html)

	return {
		name : name,
		slug : createSlug(name),
		content : term
	}

}