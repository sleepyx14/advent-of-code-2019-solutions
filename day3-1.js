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

		// find shortest Manhattan distance
		console.log('answer',getShortestLength(wire1coords,wire2coords))
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

const getShortestLength = (w1,w2) => {
	let len

	// check each point in w1
	// vs each line segment in
	// w2

	w1.forEach(wpoint => {
		for(let i = 0; i < w2.length-1; i++){
			let j = i + 1
			let compindex
			let curlen = 0

			const curcoord = w2[i]
			const nxtcoord = w2[j]

			// determine if we need to check
			// the x or y coordinate for this
			// pair of coordinates

			if(curcoord[0] === nxtcoord[0]){
				// in this case we've moved vertically
				// so compare using the y coord
				compindex = 1
			}
			else if(curcoord[1] === nxtcoord[1]){
				// in this case we've moved horizontally
				// so compare using the x coord
				compindex = 0
			}
			else{
				// in this case invalid data was
				// passed in which indicates an
				// error elsewhere so natrually
				// we just terminate the program
				// all together
				console.log("Invalid data",w1,w2)
				process.exit(-1)
			}

			if((curcoord[compindex] >= wpoint[compindex] && nxtcoord[compindex] <= wpoint[compindex]) || (nxtcoord[compindex] >= wpoint[compindex] && curcoord[compindex] <= wpoint[compindex])){
				curlen = MHDist(curcoord,nxtcoord)

				console.log('curcoord',curcoord)
				console.log('nxtcoord',nxtcoord)
				console.log('wpoint',wpoint)
				console.log('curlen',curlen)

				if(curlen > 0 && (curlen < len || len == undefined)){
					len = curlen
				}
			}
		}
	})

	// check each point in w2
	// vs each line segment in
	// w1

	w2.forEach(wpoint => {
		for(let i = 0; i < w1.length-1; i++){
			let j = i + 1
			let compindex
			let curlen = 0

			const curcoord = w1[i]
			const nxtcoord = w1[j]

			// determine if we need to check
			// the x or y coordinate for this
			// pair of coordinates

			if(curcoord[0] === nxtcoord[0]){
				// in this case we've moved vertically
				// so compare using the y coord
				compindex = 1
			}
			else if(curcoord[1] === nxtcoord[1]){
				// in this case we've moved horizontally
				// so compare using the x coord
				compindex = 0
			}
			else{
				// in this case invalid data was
				// passed in which indicates an
				// error elsewhere so natrually
				// we just terminate the program
				// all together
				console.log("Invalid data",w1,w2)
				process.exit(-1)
			}

			if((curcoord[compindex] >= wpoint[compindex] && nxtcoord[compindex] <= wpoint[compindex]) || (nxtcoord[compindex] >= wpoint[compindex] && curcoord[compindex] <= wpoint[compindex])){
				curlen = MHDist(curcoord,nxtcoord)

				console.log('curcoord',curcoord)
				console.log('nxtcoord',nxtcoord)
				console.log('wpoint',wpoint)
				console.log('curlen',curlen)

				if(curlen > 0 && (curlen < len || len == undefined)){
					len = curlen
				}
			}
		}
	})

	return len
}

const MHDist = (p,q) => {return Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1])}

fileparser('day3-1-test1.json')