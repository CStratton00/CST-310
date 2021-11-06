/**
 * Trees files
 * Code for tree generation
 */

// tree functions that prints the fractal tree design
const treeA = {
    params: {
        angle: 25.7,
        iteration: 3,
        segLen: .008 // around .01-.02
    },
    axiom: "F",
    rules: {
        F: "F[+F]F[-F]F"
    },
    commands: {
        'F'( params, startPos ) {
            F( params.segLen, startPos );
        },
        'f': f,
        '+'( params ) {
             plus( params.angle )
        },
        '-'( params ) {
            minus( params.angle )
       },
        '&': ampersand,
        '^': carrot,
        '|': pipe,
        '[': lbrack,
        ']': rbrack,
        'r': reset
    }
}

const treeB = {
    params: {
        angle: 20,
        iteration: 3,
        segLen: .02 // around .01-.02
    },
    axiom: "F",
    rules: {
        F: "F[+F]F[-F][F]"
    },
    commands: {
        'F'( params, startPos ) {
            F( params.segLen, startPos );
        },
        'f': f,
        '+'( params ) {
             plus( params.angle )
        },
        '-'( params ) {
            minus( params.angle )
       },
        '&': ampersand,
        '^': carrot,
        '|': pipe,
        '[': lbrack,
        ']': rbrack,
        'r': reset
    }
}

const treeC = {
    params: {
        angle: 22.5,
        iteration: 3,
        segLen: .02 // around .01-.02
    },
    axiom: "F",
    rules: {
        F: "FF-[-F+F+F]+[+F-F-F]"
    },
    commands: {
        'F'( params, startPos ) {
            F( params.segLen, startPos );
        },
        'f': f,
        '+'( params ) {
             plus( params.angle )
        },
        '-'( params ) {
            minus( params.angle )
       },
        '&': ampersand,
        '^': carrot,
        '|': pipe,
        '[': lbrack,
        ']': rbrack,
        'r': reset
    }
}

const treeD = {
    params: {
        angle: 20,
        iteration: 3,
        segLen: .0075 // around .01-.02
    },
    axiom: "X",
    rules: {
        X: "F[+X]F[-X]+X",
        F: "FF"
    },
    commands: {
        'F'( params, startPos ) {
            F( params.segLen, startPos );
        },
        'f': f,
        '+'( params ) {
             plus( params.angle )
        },
        '-'( params ) {
            minus( params.angle )
       },
        '&': ampersand,
        '^': carrot,
        '|': pipe,
        '[': lbrack,
        ']': rbrack,
        'r': reset
    }
}

const treeE = {
    params: {
        angle: 25.7,
        iteration: 3,
        segLen: .007 // around .01-.02
    },
    axiom: "X",
    rules: {
        X: "F[+X][-X]FX",
        F: "FF"
    },
    commands: {
        'F'( params, startPos ) {
            F( params.segLen, startPos );
        },
        'f': f,
        '+'( params ) {
             plus( params.angle )
        },
        '-'( params ) {
            minus( params.angle )
       },
        '&': ampersand,
        '^': carrot,
        '|': pipe,
        '[': lbrack,
        ']': rbrack,
        'r': reset
    }
}

const treeF = {
    params: {
        angle: 22.5,
        iteration: 3,
        segLen: .05 // around .01-.02
    },
    axiom: "X",
    rules: {
        X: "F-[[X]+X]+F[+FX]-X",
        F: "FF"
    },
    commands: {
        'F'( params, startPos ) {
            F( params.segLen, startPos );
        },
        'f': f,
        '+'( params ) {
             plus( params.angle )
        },
        '-'( params ) {
            minus( params.angle )
       },
        '&': ampersand,
        '^': carrot,
        '|': pipe,
        '[': lbrack,
        ']': rbrack,
        'r': reset
    }
}
