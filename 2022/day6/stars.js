import readInput from '../../readInput.js'
import os from 'os'

function parseFunction(lines) {

    const findMarker = (start, size) => {
        for (let i = start; i <= lines.length - 1; i++) {
            const marker = new Set();
            for (let j = size - 1; j >= 0; j--) {
                marker.add(lines[i-j])
            }
            if (marker.size === size) {
                return i + 1
            }
        }
    }
    let startIndex = findMarker(3, 4); // start at index 3 since we want at least 4 characters to check the marker
    let startOfMessageMarker = findMarker(13, 14) // start at index 13 since we want at least 14 characters to check the marker
    
    return [startIndex, startOfMessageMarker]
}

// let practice = await readInput('day6/practice.txt', parseFunction)
let real = await readInput('day6/input.txt', parseFunction)

// console.log('practice', practice)
console.log('real', real)