const promptSync = require("prompt-sync")

function prompt(text) {
    const prompt = promptSync({ sigint: true });
    const val = prompt(text);

    return val
}

module.exports = prompt