"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const node_process_1 = require("node:process");
let text = (0, node_fs_1.readFileSync)(node_process_1.argv[2], "utf-8");
console.log('Reading ' + node_process_1.argv[2]);
