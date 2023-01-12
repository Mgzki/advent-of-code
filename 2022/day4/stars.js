import readInput from '../../readInput.js'
import os from 'os'

function parseFunction(lines) {
    const pairs = lines.split(os.EOL)
    let fullyContainedPairCount = 0;
    let anyOverlapCount = 0;

    for (let i = 0; i < pairs.length; i++) {
        let assignments = pairs[i].split(',')
        let [left,right] = assignments

        left = left.split('-').map(x => parseInt(x))
        right = right.split('-').map(x => parseInt(x))

        // part 1 - FULLY CONTAINED
        if (left[0] >= right[0] && left[1] <= right[1]) fullyContainedPairCount++ // first range contained by second
        else if (right[0] >= left[0] && right[1] <= left[1]) fullyContainedPairCount++ // second range contained by first

        // part 2 - ANY OVERLAP
        if (left[0] >= right[0] && left[0] <= right[1]) anyOverlapCount++ // [6-6] and [4-6] --- 6 >= 4, 6 <= 6
        else if (right[0] >= left[0] && right[0] <= left[1]) anyOverlapCount++ // [5-7] and [7-9] --- 7 >= 5, 7 <= 7

    }
    return [fullyContainedPairCount, anyOverlapCount]
}

// let practice = await readInput('day4/practice.txt', parseFunction)
let real = await readInput('day4/input.txt', parseFunction)

// console.log('practice', practice)
console.log('real', real)