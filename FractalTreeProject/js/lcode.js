// generate tree code
function generateTree( treeType ) {
    var system = treeType;

    // get the first character of the tree
    let systemState = system.axiom;
    let iterations  = system.params.iteration;

    // from the first character generate the tree string for the given number of iterations
    for( let i = 0; i < iterations; i++ ) {
        // set the system state to the next generation
        systemState = renderAGeneration(system, systemState);
    }

    // draw the tree using the tree type and string
    drawTrees( system, systemState );
}

// render the tree grammar
function renderAGeneration( system, previousGeneration ) {
    // create a blank variable to hold the new generation
    let nextGeneration = '';

    // loop through the previous generation
    for (const character of previousGeneration) {
        // add the new rule set to the next generation
        nextGeneration += applyRule(system.rules, character);
    }
    
    return nextGeneration;
}

// apply function rules
function applyRule( rules, char ) {
    // if the rule exists use rule otherwise return the character
    return rules[char] || char;
}

// draw the tree
function drawTrees( tree, treeString ) {
    // loop through the tree string
    for( const character of treeString ) {
        // if the character is in the tree commands
        if( tree.commands[character] ) {
            // execute the command
            tree.commands[character]( tree.params );
        }
    }
}