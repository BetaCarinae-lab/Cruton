import * as ohm from 'ohm-js'
import { readFileSync, writeFileSync } from 'node:fs'
import { argv } from 'node:process'
import { dict } from './semantics'
import { exec } from 'node:child_process'
import * as path from 'path'
import { exit } from 'node:process'

export const grammar = ohm.grammar(readFileSync('cruton.ohm', 'utf-8'))

if(argv[2] == 'new') {
    const structure = {
        name: argv[3],
        main: null,
        outputFolder: null,
    }

    writeFileSync('config.json', JSON.stringify(structure, null, 2), 'utf-8')

    exit(0)
}

const input = readFileSync(argv[2], 'utf-8')

const matchresult = grammar.match(input)

const semantics = grammar.createSemantics().addOperation('eval', dict)

if(matchresult.failed()) {
    throw new Error('Failed to match: ' + matchresult.message)
} else {
    const output = semantics(matchresult).eval()
    if(argv[3] == '-o') {
        const outputname = argv[4] == 'default' ? path.parse(argv[2]).name + '.js' : argv[4]
        writeFileSync(argv[4], output, 'utf-8')
        if(argv[5] != '-s') {
            exec('node ' + argv[4], (error, stdout, stderr) => {
                if(error) {
                    console.error('Error when running')
                    console.error(error.message)
                }

                if(stdout) {
                    console.log('OUT:')
                    console.log(stdout)
                }

                if(stderr) {
                    // do nothing ig
                }
            })
        } else {
            console.log(`Produced output at ${argv[4]}`)
        }
    } else {
        console.log('No output specified!, use -o [name].js to create a output file!')
        console.log('Here is the output:')
        console.log(output)
    }
}