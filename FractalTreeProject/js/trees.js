// tree functions that prints the fractal tree design
const treeA = {
    params: {
        angle: 25.7,
        iteration: 5,
        segLen: .013 // around .01-.02
    },
    axiom: "F",
    rules: {
        F: "F[+F]F[-F]F"
    },
    commands: {
        'F'( params ) {
            F( params.segLen );
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
        ']': rbrack
    }
}

const treeB = {
    params: {
        angle: 20,
        iteration: 5,
        segLen: .013 // around .01-.02
    },
    axiom: "F",
    rules: {
        F: "F[+F]F[-F][F]"
    },
    commands: {
        'F'( params ) {
            F( params.segLen );
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
        ']': rbrack
    }
}

const treeC = {
    params: {
        angle: 22.5,
        iteration: 4,
        segLen: .013 // around .01-.02
    },
    axiom: "F",
    rules: {
        F: "FF-[-F+F+F]+[+F-F-F]"
    },
    commands: {
        'F'( params ) {
            F( params.segLen );
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
        ']': rbrack
    }
}

const treeD = {
    params: {
        angle: 20,
        iteration: 7,
        segLen: .013 // around .01-.02
    },
    axiom: "X",
    rules: {
        X: "F[+X]F[-X]+X",
        F: "FF"
    },
    commands: {
        'F'( params ) {
            F( params.segLen );
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
        ']': rbrack
    }
}

const treeE = {
    params: {
        angle: 25.7,
        iteration: 7,
        segLen: .013 // around .01-.02
    },
    axiom: "X",
    rules: {
        X: "F[+X][-X]FX",
        F: "FF"
    },
    commands: {
        'F'( params ) {
            F( params.segLen );
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
        ']': rbrack
    }
}

const treeF = {
    params: {
        angle: 22.5,
        iteration: 5,
        segLen: .013 // around .01-.02
    },
    axiom: "X",
    rules: {
        X: "F-[[X]+X]+F[+FX]-X",
        F: "FF"
    },
    commands: {
        'F'( params ) {
            F( params.segLen );
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
        ']': rbrack
    }
}
