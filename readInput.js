import { readFile } from "node:fs/promises"

async function readInput(filePath, parseFunction) {
    const input = await readFile(filePath, {encoding: 'utf-8'})
    return parseFunction(input)
}

export default readInput