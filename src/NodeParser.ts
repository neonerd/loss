
import { ILossTerm, ILossNode, ILossNodeDataset } from "./interfaces/Loss"
import { parseTerm } from "./TermParser"

function divideNode(node: string): string[] {
	return node.split('~~~')
}

interface INodeParts {
	[index: string]: ILossNodeDataset
}

interface INodePart {
	partName : string
	dataset : ILossNodeDataset
}

function parseNodePart(part: string): INodePart {
	let parts = part.split(/\s/)

	return {
		partName : parts[0],
		dataset : JSON.parse(parts.slice(1).join(''))
	}
}

export function parseNodeParts(parts: string[]): INodeParts {

	var output: INodeParts = {}
	parts.map(function(part){
		let parsed = parseNodePart(part)
		output[parsed.partName] = parsed.dataset
	})

	return output;
}

export function parseNode(node: string): ILossNode {
	let parts = divideNode(node)
	// parse first part as 
	let term = parseTerm(parts.shift())
	// parse remaining parts as datasets
	let datasets = parseNodeParts(parts)

	// if we have a Variables dataset, assign it
	var variables = {}
	if(datasets['Variables'] != undefined) {
		variables = datasets['Variables']
	}

	// if we have an Edges dataset, do something

	// if we have a System dataset, do something

	return {
		id : '',
		path : term.slug,

		term : term,
		variables : variables,
		system : {
			modified : new Date(),
			filePaths : {
				relative : '',
				absolute : ''
			}
		}
	}
}