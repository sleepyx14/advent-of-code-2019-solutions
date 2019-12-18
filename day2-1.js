//store the initial state
// of the Intcode program
let program = '1,9,10,3,2,3,11,0,99,30,40,50'.split(',').map(x => parseInt(x))
let curopcode = program[0]
let index = 0

const splitprogram = (initprogram) => {
	let subprograms = []
	let curset = []

	for (const x in initprogram){
		if(x % 4 == 0){
			if(curset.length > 0)
				subprograms.push(curset)

			curset = []
		}
		curset.push(initprogram[x])
	}

	if((initprogram.length - 1) % 4 != 0)
		subprograms.push(curset)

	return subprograms
}

while(true){
	if(curopcode == 99 || (curopcode != 1 && curopcode != 2))
		break

	let splitinput = splitprogram(program)
	let input = splitinput[index]
	let res = 0
	let pos1 = program[index + 1]
	let pos2 = program[index + 2]
	let outputpos = program[index + 3]

	if(curopcode == 1){
		// add operation
		res = program[pos1] + program[pos2]
	}
	else{
		// multiply operation
		res = program[pos1] * program[pos2]
	}
	program[outputpos] = res
	index += 4
	curopcode = program[index]
}

console.log('final program',program)