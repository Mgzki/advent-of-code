import readInput from '../../readInput.js'
import os from 'os'

function parseFunction(lines) {
    let input = String(lines.split(os.EOL)).split(',')
}

let practice = await readInput('day6/practice.txt', parseFunction)
// let real = await readInput('day6/input.txt', parseFunction)

console.log('practice', practice)
// console.log('real', real)