// tree functions that prints the fractal tree design
const treeA = {
    axiom: "F",
    rules: {
        F: "F[+F]F[-F]F"
    },
}

const treeB = {
    axiom: "F",
    rules: {
        F: "F[+F]F[-F][F]"
    },
}

const treeC = {
    axiom: "F",
    rules: {
        F: "FF-[-F+F+F]+[+F-F-F]"
    },
}

const treeD = {
    axiom: "X",
    rules: {
        X: "F[+X]F[-X]+X",
        F: "FF"
    },
}

const treeE = {
    axiom: "X",
    rules: {
        X: "F[+X][-X]FX",
        F: "FF"
    },
}

const treeF = {
    axiom: "X",
    rules: {
        X: "F-[[X]+X]+F[+FX]-X",
        F: "FF"
    },
}

// apply function rules
function applyRule(rules, char) {
    return rules[char] || char;
}

// render the tree grammar
function renderAGeneration(system, previousGeneration) {
    let nextGeneration = '';
    for (const character of previousGeneration) {
        nextGeneration += applyRule(system.rules, character);
    }
    return nextGeneration;
}

module.exports = {
    treeA,
    treeB,
    treeC, 
    treeD,
    treeE,
    treeF,
    applyRule,
    renderAGeneration
}