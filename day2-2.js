const fs = require('fs')

fs.readFile('day2-1.txt','utf-8',(err,data) => {
	if (err) {
		console.error(err)
		return
	}

	const program = data.split(',').map(x => parseInt(x))

	// START OVER
	// FROM HERE

	for(let noun = 0; noun <= 99; noun++){
		for(let verb = 0; verb <= 99; verb++){
			let curprogram = Array.from(program)

			curprogram[1] = noun
			curprogram[2] = verb

			curprogram = procinput(curprogram)

			if(curprogram[0] == 19690720){
				console.log("solution:",100 * noun + verb)
				process.exit(22) // exit since we found a solution
			}
			else{
				console.log("noun",noun)
				console.log("verb",verb)
				console.log(`program_${noun}-${verb}`,JSON.stringify(curprogram))
			}
		}
	}
})

const procinput = (input) => {
	let curopcode = input[0]
	let index = 0

	while(true){
		if(curopcode == 99 || (curopcode != 1 && curopcode != 2))
			break

		let res = 0
		let pos1 = input[index + 1]
		let pos2 = input[index + 2]
		let outputpos = input[index + 3]

		if(curopcode == 1){
			// add operation
			res = input[pos1] + input[pos2]
		}
		else{
			// multiply operation
			res = input[pos1] * input[pos2]
		}
		input[outputpos] = res
		index += 4
		curopcode = input[index]
	}

	return input
}