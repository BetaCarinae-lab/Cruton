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
exports.grammar = ohm.grammar((0, node_fs_1.readFileSync)('cruton.ohm', 'utf-8'));
const input = (0, node_fs_1.readFileSync)(node_process_1.argv[2], 'utf-8');
const matchresult = exports.grammar.match(input);
const semantics = exports.grammar.createSemantics().addOperation('eval', semantics_1.dict);
if (matchresult.failed()) {
    throw new Error('Failed to match: ' + matchresult.message);
}
else {
    const output = semantics(matchresult).eval();
    (0, node_fs_1.writeFileSync)(node_process_1.argv[3], output, 'utf-8');
}
