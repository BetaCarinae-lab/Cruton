import * as ohm from 'ohm-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { argv } from 'node:process'
import { dict } from './semantics'

export const grammar = ohm.grammar(readFileSync('cruton.ohm', 'utf-8'))
const input = readFileSync(argv[2], 'utf-8')

const matchresult = grammar.match(input)

const semantics = grammar.createSemantics().addOperation('eval', dict)

if(matchresult.failed()) {
    throw new Error('Failed to match: ' + matchresult.message)
} else {
    const output = semantics(matchresult).eval()
    writeFileSync(argv[3], output, 'utf-8')
}