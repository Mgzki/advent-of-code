import readInput from '../../readInput.js'
import os from 'os'

function parseFunction(lines) {
    let input = String(lines.split(os.EOL)).split(',')
    // console.log(input)
    let stacksOrInstructions = 0; // init as 0 to get stacks
    let separatedInput = [[], []] // index 0 is stacks, index 1 is instructions

    for (let i = 0; i < input.length; i++) {
        if (input[i] == '') {
            stacksOrInstructions++
            continue
        }

        // handle stacks
        if (stacksOrInstructions == 0) {
            let rows = input[i].match(/( {4}|[A-Z])/g)
            if (rows != null) separatedInput[stacksOrInstructions].push(rows) // match 4 spaces, or a character contained by [] to separate current line into stacks

        } else { // handle instructions
            let instructionValues = input[i].match(/[0-9]+/g).map(x => parseInt(x))
            let instructions = {'move': instructionValues[0], 'from': instructionValues[1], 'to': instructionValues[2]}
            separatedInput[stacksOrInstructions].push(instructions)
        }
    }
    let stacks = []
    // create stacks
    for (let i = separatedInput[0].length - 1; i >= 0; i--) {
        let row = separatedInput[0][i]
        for (let j = 0; j < row.length; j++) {
            if (separatedInput[0][i][j] != '    ') {
                if (stacks[j]) stacks[j].push(separatedInput[0][i][j])
                else stacks.push([separatedInput[0][i][j]])
            }
        }
    }

    let stacksPartTwo = JSON.parse(JSON.stringify(stacks)) // deepcopy original stacks

    function performMovePartOne(procedure) {
        if (procedure.move < 1) return
        stacks[procedure.to - 1].push(stacks[procedure.from - 1].pop())
        procedure.move -= 1
        performMovePartOne(procedure)
    }

    function performMovePartTwo(procedure) {
        let crates = []
        for (let i = 0; i < procedure.move; i++) {
            crates.push(stacksPartTwo[procedure.from - 1].pop())
        }
        for (let i = 0; i < procedure.move; i++) {
            stacksPartTwo[procedure.to - 1].push(crates.pop())
        }
    }

    // run instructions
    separatedInput[1].forEach(procedure => {
        let tempMoves = JSON.parse(JSON.stringify(procedure.move))
        performMovePartOne(procedure)
        procedure.move = tempMoves
        performMovePartTwo(procedure)
    })

    function getTops(crateStacks) {
        let tops = ''
        crateStacks.forEach(stack => {
            let top = stack.pop() // get top
            tops += top
            stack.push(top) // put top back
        })
        return tops
    }
    return [getTops(stacks), getTops(stacksPartTwo)]
}

// let practice = await readInput('day5/practice.txt', parseFunction)
let real = await readInput('day5/input.txt', parseFunction)

// console.log('practice', practice)
console.log('real', real)