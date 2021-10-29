"use strict";

var canvas;
var gl;

var points = [];

window.onload = function init() {

    // canvas = document.getElementById( "gl-canvas" );

    // gl = WebGLUtils.setupWebGL( canvas );
    // if ( !gl ) { alert( "WebGL isn't available" ); }

    // gl.viewport( 0, 0, canvas.width, canvas.height );
    // gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // gl.enable(gl.DEPTH_TEST);

    // Get A WebGL context
    var canvas = document.querySelector("c");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    //
    //  Load shaders and initialize attribute buffers
    //
    // Use our boilerplate utils to compile the shaders and link into a program
    var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader", "fragment-shader"]);

    // look up where the vertex data needs to go.
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    // look up uniform locations
    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

    // Create a buffer and put three 2d clip space points in it
    var positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var positions = [
        10, 20,
        80, 20,
        10, 30,
        10, 30,
        80, 20,
        80, 30,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    // set the resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // draw
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    gl.drawArrays(primitiveType, offset, count);
}

function render() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten( modelViewMatrix ) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten( projectionMatrix ) );

    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    requestAnimFrame( render );

}