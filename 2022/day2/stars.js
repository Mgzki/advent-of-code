import readInput from '../../readInput.js'
import os from 'os'

function parseFunction(lines) {
    const rounds = String(lines.split(os.EOL)).split(',')
    // rock: X, paper: Y, scissors: Z
    // opponent - rock: A, paper: B, scissors: C
    const scoresForMove = {'X': 1, 'Y': 2, 'Z': 3}
    const opponentMovesMap = {'A': 'X', 'B': 'Y', 'C': 'Z'}
    const winConditions = {'A Y': 1, 'B Z': 1, 'C X': 1}
    const beatOpponent = {'A': 'Y', 'B': 'Z', 'C': 'X'}
    const loseToOpponent = {'A': 'Z', 'B': 'X', 'C': 'Y'}
    const scoresForOutcome = {'L': 0, 'T': 3, 'W': 6}
    let partOneScore = 0;
    let partTwoScore = 0;

    rounds.forEach(round => {
        let moves = round.split(' ')
        partOneScore += opponentMovesMap[moves[0]] == moves[1] 
            ? scoresForMove[moves[1]] + scoresForOutcome['T'] // draw
            : (winConditions[round] == 1 
                ? scoresForMove[moves[1]] + scoresForOutcome['W'] // win
            : scoresForMove[moves[1]]) //lose
        // part 2: 2nd column is the outcome you need to achieve
        // X: lose, Y: draw, Z: win
        partTwoScore += moves[1] == 'Y' 
            ?  scoresForMove[opponentMovesMap[moves[0]]] + scoresForOutcome['T'] // draw
            : moves[1] == 'Z' 
                ? scoresForMove[beatOpponent[moves[0]]] + scoresForOutcome['W'] // win
            : scoresForMove[loseToOpponent[moves[0]]] // lose
    })
    return [partOneScore, partTwoScore]
}

// let practice = await readInput('day2/practice.txt', parseFunction)
let real = await readInput('day2/input.txt', parseFunction)

// console.log('practice', practice)
console.log('real', real)