export interface ILossTerm {
	name : string
	slug : string

	content : string
}

interface ILossNodeVariables {
	[index: string]: any
}

interface ILossNodeSystem {
	modified : Date
	filePaths : {
		relative : string
		absolute : string
	} 
}

export interface ILossNode {
	// SHA-1 hash of the path
	id : string
	// path to the node, relative of db location
	// i.e. philosophy/concepts/BrainInVat
	path : string

	// term data
	term : ILossTerm
	// custom variables
	variables : ILossNodeVariables
	// system data
	system : ILossNodeSystem
}

export interface ILossNodeDataset {
	[index: string]: any
}
