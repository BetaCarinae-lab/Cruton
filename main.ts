import { readFileSync } from 'node:fs'
import { argv } from 'node:process'
import { inspect } from 'node:util'
import * as ohm from 'ohm-js'

const code = readFileSync(argv[2], 'utf-8')
const grammar = ohm.grammar(readFileSync('./cruton.ohm', 'utf-8'))

let semanticDictionary: ohm.ActionDict<any> = {
    Program(sections) {
        let ast = []
        for(let section in sections.children) {
            ast.push(sections.children[section].ast())
        }
        return ast
    },

    MAIN(_dot, _, body, _end) {
        let bodyast = []
        for(let i in body.children) {
            bodyast.push(body.children[i].ast())
        }
        return {
            type: "main",
            body: bodyast
        }
    },

    Out(_out, expr) {
        return {
            type: "print",
            value: expr.ast()
        }
    },

    string(_oq, text, _cq) {
        return text.sourceString
    },
}

const semantics = grammar.createSemantics().addOperation('ast', semanticDictionary)
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
    console.log(JSON.stringify(ast, null, 2))
    
}