const fs = require('fs')

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
