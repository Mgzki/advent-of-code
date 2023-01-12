import readInput from '../../readInput.js'
import os from 'os'

function parseFunction(lines) {
    // split on EOL and then split again on ',,' so that each element of elves is a string containing all the calories for a given elf separated by a ','
    let elves = String(lines.split(os.EOL)).split(',,')
    let caloriesOfElves = [];
    let maxCalories = 0;

    elves.forEach((calories, index) => {
        // where calories is a string in the form of '1000,2000,3000'
        // split on commas, parse integers, and sum the calories
        caloriesOfElves.push(calories.split(',').map((x) => parseInt(x)).reduce((acc, cur) => acc + cur))
        if (caloriesOfElves[index] > maxCalories) maxCalories = caloriesOfElves[index]
    })

    // [part1, part2] where part2 is the sum of the top 3 elves with most calories
    return [maxCalories, caloriesOfElves.sort((a,b) => b - a).slice(0,3).reduce((acc, cur) => acc + cur)]
}

// let practice = await readInput('day1/practice.txt', parseFunction)
let real = await readInput('day1/input.txt', parseFunction)

// console.log('practice', practice)
console.log('real', real)