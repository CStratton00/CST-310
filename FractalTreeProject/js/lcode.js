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

    // draw the tree using the tree type and string
    drawTrees( system, systemState, startPos );
}

function generateForest(numTrees) {
    //let trees[numTrees];
    //let pos[numTrees];
    for (let i = 0; i < numTrees; i++) {
        let j = 1; //Math.floor((Math.random() * 6) + 1);
        switch (j) {
            case 1:
                //trees[i] = treeA;
                generateTree(treeA, vec2(0, -1));//(Math.random() * (1.0000 + 1.0000) - 1.0000).toFixed(4), (Math.random() * (0.0000 + 1.0000) - 1.0000).toFixed(4)));
            default:
                return;
        }
    }
}
//         case 2:
//             trees[i] = treeB;
//         case 3:
//             trees[i] = treeC;
//         case 4:
//             trees[i] = treeD;
//         case 5:
//             trees[i] = treeE;
//         case 6:
//             trees[i] = treeF;
//         default:
//             trees[i] = treeA;
//     }
// }
// for (let i = 0; i < numTrees; i++)
// {
//     pos[i] = vec2((Math.random() * (1.0000 + 1.0000) - 1.0000).toFixed(4), (Math.random() * (0.0000 + 1.0000) - 1.0000).toFixed(4));
// }
// for (let i = 0; i < numTrees; i++)
// {
//     generateTree(trees[i], pos[i]);
// }
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
