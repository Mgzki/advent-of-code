import readInput from '../../readInput.js'
import os from 'os'

function parseFunction(lines) {
    const eolRegEx = new RegExp(os.EOL, "g")
    const bags = String(lines.split(os.EOL)).split(',')

    let priorities = [];

    let badgePriorities = [];

    // create array with length = number of groups (# bags / 3 since 3 elves per group)
    let groups = Array.apply(null, Array(bags.length / 3)).map(function () {return []});
    // initialize to -1 so that we can increment on the first elf of every group
    let currentGroupIndex = -1;

    // returns the bag as key,value pairs so we can quickly check if a bag has a given character
    function bagToSet(bag) {
        let set = {}
        bag.forEach(char => { set[char] = true})
        return set
    }

    bags.forEach((bag, index) => {
        if ((index + 1) % 3 == 1) currentGroupIndex++
        groups[currentGroupIndex].push(bag)
        
        let left = bag.slice(0, bag.length / 2).split('')
        let right = bag.slice(bag.length /2, bag.length).split('')

        let leftSet = bagToSet(left)
        
        for (let i = 0; i < right.length; i++) {
            let priority = right[i].charCodeAt() - 96
            if (leftSet[right[i]]) {
                priorities.push(priority > 0 ? priority : priority + 58)
                break
            }
        }
    })

    function sumPriorities(array) {
        return array.reduce((acc, cur) => {
            return acc + cur
        })
    } 

    let partOne = sumPriorities(priorities)

    groups.forEach((group) => {
        let firstElf = bagToSet(group[0].split(''))
        let secondElf = bagToSet(group[1].split(''))
        let thirdElf = group[2].split('')

        for (let i = 0; i < thirdElf.length; i++) {
            let priority = thirdElf[i].charCodeAt() - 96
            if (firstElf[thirdElf[i]] && secondElf[thirdElf[i]]) {
                badgePriorities.push(priority > 0 ? priority : priority + 58)
                break
            }
        }
    })
    let partTwo = sumPriorities(badgePriorities)
    return [partOne, partTwo]
}

// let practice = await readInput('day3/practice.txt', parseFunction)
let real = await readInput('day3/input.txt', parseFunction)

// console.log('practice', practice)
console.log('real', real)