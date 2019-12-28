const {intersect} = require('mathjs')
const fs = require('fs')
const readline = require('readline')

const fileparser = (filepath) => {
	let wiredata = []

	const readInterface = readline.createInterface({
		input: fs.createReadStream(filepath),
		output: process.stdout,
		console: false
	})

	readInterface.on('line', function(line) {
		wiredata.push(line.split(","))
	})

	readInterface.on('close', () => {
		const wire1coords = convertPathToCoordinates(wiredata[0])
		const wire2coords = convertPathToCoordinates(wiredata[1])

		// console.log('wire1',JSON.stringify(wire1coords,null,4))
		// console.log('wire2',JSON.stringify(wire2coords,null,4))

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
	// console.log(coordinates)
	coordinates = addgappoints(coordinates)
	return coordinates
}

const getShortestLength = (w1,w2) => {
	let len

	w1.forEach(point => {
		let calclen

		if(inlist(point,w2) == true){
			calclen = Math.abs(point[0]) + Math.abs(point[1])

			if(calclen > 0 && (calclen < len || len == undefined)){
				len = calclen
			}
		}
	})

	w2.forEach(point => {
		let calclen

		if(inlist(point,w1) == true){
			calclen = Math.abs(point[0]) + Math.abs(point[1])

			if(calclen > 0 && (calclen < len || len == undefined)){
				len = calclen
			}
		}
	})

	return len
}

const addgappoints = (coords) => {
	let updatedcoords = Array.from(coords)

	for(let i = 0; i < coords.length-1; i++){

		let curpoint = coords[i]
		let nxtpoint = coords[(i + 1)]
		let points = []
		let start
		let end
		let dim
		let static
		let rev = true
		let insertpoint = updatedcoords.indexOf(nxtpoint)

		if(curpoint[0] == nxtpoint[0]){
			start = curpoint[1]
			end = nxtpoint[1]

			if(start > end){
				start = nxtpoint[1]
				end = curpoint[1]
				rev = false
			}

			dim = 'y'
			static = curpoint[0]
			start++
		}
		else if(curpoint[1] == nxtpoint[1]){
			start = curpoint[0]
			end = nxtpoint[0]

			if(start > end){
				start = nxtpoint[0]
				end = curpoint[0]
				rev = false
			}

			dim = 'x'
			static = curpoint[1]
			start++
		}

		if(start && end){
			for(let a = start; a < end; a++){
				if(dim == 'x'){
					points.push([a,static])
				}
				else if(dim == 'y'){
					points.push([static,a])
				}
			}

			if(rev == true){
				points.reverse().forEach(point => updatedcoords.splice(insertpoint,0,point))
			}
			else{
				points.forEach(point => updatedcoords.splice(insertpoint,0,point))
			}
		}
	}
	return updatedcoords
}

const inlist = (element,arr) => {
	return arr.some((testarr) => (testarr[0] == element[0] && testarr[1] == element[1]))
}

fileparser('day3-1-input.txt')