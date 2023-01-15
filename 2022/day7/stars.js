import readInput from '../../readInput.js'
import os from 'os'

function parseFunction(lines) {
    let input = String(lines.split(os.EOL)).split(',')
    
    let structure = {}
    let directories = []
    let sumDirectories = 0

    let totalDiskSpace = 70000000
    let requiredSpace = 30000000

    let deleteToFreeSpaceOptions = []

    function addSum(fileSize) {
        directories.forEach(directory => {
            structure[directory].size += fileSize
        })
    }

    function sumDeleteTargetSize(neededSpace) {
        Object.values(structure).map(dir => {
            if (dir.size <= 100000) sumDirectories += dir.size
            if (dir.size >= neededSpace) deleteToFreeSpaceOptions.push(dir.size)
        })
    }

    for (let i = 0; i < input.length; i++) {
        let line = input[i].split(' ')

        //commands
        if (line[0] == '$') {
            if (line[1] == 'cd') {
                if (line[2] !== '..') {
                    // Handle directories with same name
                    if (structure[directories[directories.length - 1]]) {
                        directories.push(line[2] + i)
                        structure[directories[directories.length - 1]] = {parent: directories[directories.length - 2], size: 0}
                    } else {
                        directories.push(line[2])
                        structure[directories[directories.length - 1]] = {parent: directories[directories.length - 2], size: 0}
                    }
                    continue
                }
                directories.pop()
            }
        }

        let size = parseInt(line[0])
        if (size) {
            addSum(size)
        }
    }
    let freeSpace = totalDiskSpace - structure['/'].size
    let neededSpace = requiredSpace - freeSpace
    sumDeleteTargetSize(neededSpace)

    // part1, part2
    return [sumDirectories, Math.min(...deleteToFreeSpaceOptions)]
}

// let practice = await readInput('day7/practice.txt', parseFunction)
// console.log('practice', practice)

let real = await readInput('day7/input.txt', parseFunction)
console.log('real', real)