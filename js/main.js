#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.grammar = void 0;
const ohm = __importStar(require("ohm-js"));
const node_fs_1 = require("node:fs");
const node_process_1 = require("node:process");
const semantics_1 = require("./semantics");
const node_child_process_1 = require("node:child_process");
const path = __importStar(require("path"));
const node_process_2 = require("node:process");
const node_path_1 = require("node:path");
exports.grammar = ohm.grammar((0, node_fs_1.readFileSync)('./src/cruton.ohm', 'utf-8'));
const config = (0, node_fs_1.existsSync)("./config.json") ? JSON.parse((0, node_fs_1.readFileSync)("./config.json", 'utf-8')) : { name: null, main: null, outputFolder: null };
if (node_process_1.argv[2] == 'new') {
    const structure = {
        name: node_process_1.argv[3],
        main: null,
        outputFolder: null,
    };
    (0, node_fs_1.writeFileSync)('config.json', JSON.stringify(structure, null, 2), 'utf-8');
    (0, node_process_2.exit)(0);
}
const input = (0, node_fs_1.readFileSync)(node_process_1.argv[2], 'utf-8');
const matchresult = exports.grammar.match(input);
const semantics = exports.grammar.createSemantics().addOperation('eval', semantics_1.dict);
if (matchresult.failed()) {
    throw new Error('Failed to match: ' + matchresult.message);
}
else {
    const output = semantics(matchresult).eval();
    if (node_process_1.argv[3] == '-o') {
        const outputname = node_process_1.argv[4] == 'default' ? path.parse(node_process_1.argv[2]).name + '.js' : node_process_1.argv[4];
        (0, node_fs_1.writeFileSync)((0, node_path_1.join)(config.outputFolder ? config.outputFolder : "", outputname), output, 'utf-8');
        if (node_process_1.argv[5] != '-s') {
            (0, node_child_process_1.exec)('node ' + (0, node_path_1.join)(config.outputFolder ? config.outputFolder : "", outputname), (error, stdout, stderr) => {
                if (error) {
                    console.error('Error when running');
                    console.error(error.message);
                }
                if (stdout) {
                    console.log('OUT:');
                    console.log(stdout);
                }
                if (stderr) {
                    // do nothing ig
                }
            });
        }
        else {
            console.log(`Produced output at ${(0, node_path_1.join)(config.outputFolder ? config.outputFolder : "", outputname)}`);
        }
    }
    else {
        console.log('No output specified!, use -o [name].js to create a output file!');
        console.log('Here is the output:');
        console.log(output);
    }
}
