"use strict";

var gl;
var theta = [ 0, 0, 0 ];

var thetaLoc;

window.onload = function init() {
    // --------------- Create Canvas ---------------
    // prepare webgl and canvas
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // --------------- Create Tree Points ---------------
    // generateTree( treeF );
    F( .013 );

    // --------------- WebGL Jazz ---------------
    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor(0.5, 0.5, 0.5, 0.9);

    gl.enable(gl.DEPTH_TEST);

    //  Load shaders and initialize attribute buffers
    let program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load pointer data into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten( points ), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffers
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    // Load color data into the GPU
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten( colors ), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    thetaLoc = gl.getUniformLocation( program, "theta" );

    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.uniform3fv( thetaLoc, theta );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}

