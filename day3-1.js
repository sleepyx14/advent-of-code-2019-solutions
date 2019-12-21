const fs = require('fs')

const fileparser = (filepath) => {

	/*
		Assumes that the input file
		contains an json object that
		matches the following pattern

		{
			"wire1": <Array of strings that represent the path of the wire>,
			"wire2": <Array of strings that represent the path of the wire>
		}
	*/

	fs.readFile(filepath,'utf-8',(err,data) => {
		if (err) {
			console.error(err)
			return
		}

		const wiredata = JSON.parse(data)
		const wire1coords = convertPathToCoordinates(wiredata.wire1)
		const wire2coords = convertPathToCoordinates(wiredata.wire2)

		console.log('wire1',wire1coords)
		console.log('wire2',wire2coords)
	})
}

const pathops = (dir,pathx,pathy,units) => {
	switch (dir){
		case 'U':
			return {
				'x': pathx,
				'y': pathy + units
			}
		case 'D':
			return {
				'x': pathx,
				'y': pathy - units
			}
		case 'L':
			return {
				'x': pathx - units,
				'y': pathy
			}
		case 'R':
			return {
				'x': pathx + units,
				'y': pathy
			}
		default:
			console.log("Invalid input",dir)
			process.exit(-1)
			break
	}
}

const convertPathToCoordinates = (pathlist) => {
	let coordinates = []
	let x = 0
	let y = 0

	for(const path of pathlist){
		const pathdata = Array.from(path)
		const dir = pathdata[0]
		const units = pathdata.map(function(value,index){
			if(index > 0){
				return value
			}
			else{
				return ""
			}
		})
		.join("")

		let newcoords = pathops(dir,x,y,parseInt(units))
		x = newcoords.x
		y = newcoords.y
		coordinates.push([x,y])
	}

	return coordinates
}

fileparser('day3-1-test1.json')