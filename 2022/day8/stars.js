import readInput from '../../readInput.js'
import os from 'os'

function buildColumnsFromRows(rows) {
    let columns = []
    for (let i = 0; i < rows.length; i++) { // row
        columns.push([])
        for (let j = 0; j < rows[i].length; j++) { // column in row
            columns[i].push(rows[j][i])
        }
    }
    return columns
}

function runLoop(start, end, array, row, column, inverted = false){
    let visibility = 0;
    let hidden = false;
    for (let i = start; !inverted ? i < end : i >= 0; !inverted ? i++ : i--){
        if (array[row][column] <= array[row][i]) {
            visibility = Math.abs(column - i)
            hidden = true;
            break;
        } else visibility = Math.abs(column - i)
    }
    return [hidden, visibility]
}

function checkLeftAndRight(array, row, column) { // columns get passed in as rows so top = left, bottom = right
    const [hiddenOnLeft, visibilityScoreLeft] = runLoop(column - 1, column, array, row, column, true);
    const [hiddenOnRight, visibilityScoreRight] = runLoop(column + 1, array[row].length, array, row, column);
    
    return [hiddenOnLeft && hiddenOnRight, visibilityScoreLeft * visibilityScoreRight]
}

function parseFunction(lines) {
    let rows = String(lines.split(os.EOL)).split(',')
    
    let hiddenTreesCount = 0
    let columns = buildColumnsFromRows(rows);
    let totalTrees = rows.length * columns.length

    let maxVisibility = 0;

    for (let row = 1; row < rows.length - 1; row++) {
        for (let column = 1; column < rows[row].length - 1; column++){
            const [hiddenInRow, visibilityScoreRow] = checkLeftAndRight(rows, row, column)
            const [hiddenInColumn, visibilityScoreCol] = checkLeftAndRight(columns, column, row) // passing columns as rows, flip row and column order

            if (hiddenInRow) {
                if (hiddenInColumn) hiddenTreesCount++
            }
            let temp = visibilityScoreCol * visibilityScoreRow
            if (maxVisibility < temp) maxVisibility = temp
        }
    }
    return [totalTrees - hiddenTreesCount, maxVisibility]
}

// let practice = await readInput('day8/practice.txt', parseFunction)
let real = await readInput('day8/input.txt', parseFunction)

// console.log('practice', practice)
console.log('real', real)