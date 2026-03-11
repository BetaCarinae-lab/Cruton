import { readFileSync, writeFileSync } from 'node:fs'
import { argv } from 'node:process'
import { inspect } from 'node:util'
import { exit } from 'node:process'
import * as ir from './ir'
import * as ohm from 'ohm-js'
import llvm from 'llvm-bindings'

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

    DAT(_dot, _, body, _end) {
        let bodyast = []
        for(let i in body.children) {
            
        }
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

    number(digits) {
        return new Number(digits.sourceString).valueOf()
    }
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

const numberformat = ir.builder.CreateGlobalStringPtr("%d\n")

const utils = {
    printHelper(text: any) {
        const val = [this.getPrimitive(text)]
        if(typeof text !== 'string') {
            val.unshift(numberformat)
        }
        console.log(val)
        ir.call(ir.printf, val)
    },
    getPrimitive(val: any) {
        switch(typeof val) {
            case 'string':
                return ir.createStringPTR(val)
            case 'number':
                return ir.builder.getInt32(val)
        }
    },
}

if(ast) {
    console.log('AST Build Success')
    console.log(JSON.stringify(ast, null, 2)) 
    if(argv[3] == '--ast') {
        exit(0)
    } 
    parseAST(ast) 
}

function parseAST(ast: any[]) {
    for(let section in ast) {
        for(let line in ast[section].body) {
            parse(ast[section].body[line])
        }
    }
}

function parse(astfrag: any) {
    switch(astfrag.type) {
        case 'print':
            utils.printHelper(typeof astfrag.value == "string" ? astfrag.value + '\n' : astfrag.value)
            
    }
}


ir.builder.CreateRet(ir.builder.getInt32(0))

console.log(ir.module.print())
try {
    llvm.verifyModule(ir.module)
    writeFileSync('out.ll', ir.module.print())
} catch(err) {
    console.log(err)
}