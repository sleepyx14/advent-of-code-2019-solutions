const fs = require('fs')


//store the initial state
// of the Intcode program
// let program = '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,13,19,1,9,19,23,2,13,23,27,2,27,13,31,2,31,10,35,1,6,35,39,1,5,39,43,1,10,43,47,1,5,47,51,1,13,51,55,2,55,9,59,1,6,59,63,1,13,63,67,1,6,67,71,1,71,10,75,2,13,75,79,1,5,79,83,2,83,6,87,1,6,87,91,1,91,13,95,1,95,13,99,2,99,13,103,1,103,5,107,2,107,10,111,1,5,111,115,1,2,115,119,1,119,6,0,99,2,0,14,0'.split(',').map(x => parseInt(x))
// let curopcode = program[0]
// let index = 0

fs.readFile('day2-1.txt','utf-8',(err,data) => {
	let program = data.split(',').map(x => parseInt(x))
	let curopcode = program[0]
	let index = 0

	program[1] = 12
	program[2] = 2

	while(true){
		if(curopcode == 99 || (curopcode != 1 && curopcode != 2))
			break

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
})

