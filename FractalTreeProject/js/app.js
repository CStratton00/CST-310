"use strict";

// const {
//     treeA,
//     treeB,
//     treeC,
//     treeD,
//     treeE,
//     treeF,
//     applyRule,
//     renderAGeneration
// } = require("./trees.js");

var gl;

window.onload = function init() {
    // prepare webgl and canvas
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.5, 0.5, 0.5, 0.9);

    //  Load shaders and initialize attribute buffers
    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // generateTree( treeA, vec2(.23, -1) );
    // generateTree( treeA, vec2(-.23, -.9) );
    // generateTree( treeB, vec2(.12, -.95) );
    // generateTree( treeC, vec2(.74, -.93) );
    // generateTree( treeD, vec2(.41, -.98) );
    // generateTree( treeE, vec2(-.73, -.83) );
    generateForest(1);

    gl.bufferData(gl.ARRAY_BUFFER, flatten( points ), gl.STATIC_DRAW);

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINES, 0, points.length );
}
