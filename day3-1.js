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

		console.log(wire1coords)
	})
}

const convertPathToCoordinates = (pathlist) => {
	let coordinates = [[0,0]]
	let x = 0
	let y = 0

	const pathops = {
		'U': (pathx,pathy,units) => {
			return {
				'x': pathx,
				'y': pathy + units
			}
		},
		'D': (pathx,pathy,units) => {
			return {
				'x': pathx,
				'y': pathy - units
			}
		},
		'L': (pathx,pathy,units) => {
			return {
				'x': pathx - units,
				'y': pathy
			}
		},
		'R': (pathx,pathy,units) => {
			return {
				'x': pathx + units,
				'y': pathy
			}
		},
	}

	for(const path of pathlist){
		const pathdata = Array.from(path)
		const dir = pathdata[0]
		const units = pathdata.map((value,index) => {
			if(index > 0){
				return value
			}
			else{
				return ""
			}
		})
		.join("")

		// const updatedcoords = pathops[dir](x,y,parseInt(units))
		// const dirop = pathops[dir](x,y,parseInt(units))
		// ({x,y} = dirop(x,y,parseInt(units)))
		// coordinates.push([x,y])
	}
}

fileparser('day3-1-test1.json')