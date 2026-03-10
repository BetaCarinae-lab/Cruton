import { readFileSync } from 'node:fs'
import { argv } from 'node:process'
import { inspect } from 'node:util'
import * as ohm from 'ohm-js'

const code = readFileSync(argv[2], 'utf-8')
const grammar = ohm.grammar(readFileSync('./cruton.ohm', 'utf-8'))
const semantics = grammar.createSemantics().addOperation('ast', {

})
// mr = MatchResult
const mr = grammar.match(code)
let ast;

if(mr.failed()) {
    console.error('Ast Build Failed: ' + mr.message)
} else {
    ast = semantics(mr).ast()
}

if(ast) {
    console.log('AST Build Success')
    console.log(inspect(ast))
}