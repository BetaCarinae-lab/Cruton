import * as ohm from 'ohm-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { argv } from 'node:process'

export const grammar = ohm.grammar(readFileSync('cruton.ohm', 'utf-8'))
const input = readFileSync(argv[2])
