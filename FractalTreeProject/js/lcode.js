/**
 * L-System Code
 * Functions used here to create a forest
 * Forest created through generating trees at random posiitons
 * Trees created through recursive iteration of the tree grammar
*/

// generate forest code
function generateForest( numTrees ) {
    // user inputs number of trees to populate the forest with
    for (let i = 0; i < numTrees; i++) {
        tree = randTree( Math.floor(Math.random() * 6) + 1 );
        generateTree( tree, vec2(( Math.floor( Math.random() * ( 500 - ( -500 ) + 500 )) + ( -500 )) / 1000, -1 ));
    }
}

// generate tree code
function generateTree( treeType, startPos ) {
    var system = treeType;

    // get the first character of the tree
    let systemState = system.axiom;
    let iterations  = system.params.iteration;

    // from the first character generate the tree string for the given number of iterations
    for( let i = 0; i < iterations; i++ ) {
        // set the system state to the next generation
        systemState = renderAGeneration(system, systemState);
    }
    console.log(systemState);

    // draw the tree using the tree type and string
    drawTrees( system, systemState, startPos );
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

    nextGeneration += 'r';
    return nextGeneration;
}

// apply function rules
function applyRule( rules, char ) {
    // if the rule exists use rule otherwise return the character
    return rules[char] || char;
}

// draw the tree
function drawTrees( tree, treeString, startPos ) {
    // loop through the tree string
    for( const character of treeString ) {
        // if the character is in the tree commands
        if( tree.commands[character] ) {
            // execute the command
            tree.commands[character]( tree.params, startPos );
        }
    }
}

// code to create a random tree
function randTree( num ) {
    switch (num) {
        case 1:
            return treeA;
        case 2:
            return treeB;
        case 3:
            return treeC;
        case 4:
            return treeD;
        case 5:
            return treeE;
        case 6:
            return treeF;
        default:
            return treeA;
    }
}