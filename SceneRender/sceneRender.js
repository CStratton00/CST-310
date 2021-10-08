"use strict";

var canvas;
var gl;

const cubeVerts = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5, -0.5, -0.5, 1.0 )
];

var points = [];
var colors = [];

var near    = 0.01;
var far     = 6.0;
var radius  = 2.5;
var theta   = 0.0;
var phi     = 0.0;
var dr      = 5.0 * Math.PI / 180.0;

var  fovy   = 70.0;     // Field-of-view in Y direction angle (in degrees)
var  aspect = 1.0;      // Viewport aspect ratio

var camera  = 1;         // Choose a view

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
const at = vec3( 0.0, 0.0, 0.0 );
const up = vec3( 0.0, 1.0, 0.0 );

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    aspect = canvas.width/canvas.height;

    var chair1XAdj = 0.7;
    var chair2XAdj = -0.3;
    var chair1YAdj = -0.425;
    var chair2YAdj = -0.425;
    var bookshelfXAdj = -2;
    var scalar = 0.9;

    //
    // chair 1
    //

    // arm rests
    colorCube([0.04 + chair1XAdj, 0 + chair1YAdj, 0], [0.2 * scalar, 0.9 * scalar ,0.7 * scalar]);
    colorCube([0.76 + chair1XAdj, 0 + chair1YAdj, 0], [0.2 * scalar, 0.9 * scalar, 0.7 * scalar]);

    // bottom cushions
    colorCube([0.4 + chair1XAdj, -0.16 + chair1YAdj, 0], [0.6 * scalar, 0.2 * scalar, 0.7 * scalar]);
    colorCube([0.4 + chair1XAdj, 0 + chair1YAdj, 0], [0.6 * scalar, 0.2 * scalar, 0.7 * scalar]);

    // back rest
    colorCube([0.4 + chair1XAdj, 0.25 + chair1YAdj, -0.225], [0.6 * scalar, 0.5 * scalar, 0.2 * scalar]);


    //
    // chair 2
    //

    // arm rests
    colorCube([0.04 + chair2XAdj, 0 + chair2YAdj, 0], [0.2 * scalar, 0.9 * scalar, 0.7 * scalar]);
    colorCube([0.76 + chair2XAdj, 0 + chair2YAdj, 0], [0.2 * scalar, 0.9 * scalar, 0.7 * scalar]);

    // bottom cushions
    colorCube([0.4 + chair2XAdj, -0.16 + chair2YAdj, 0], [0.6 * scalar, 0.2 * scalar, 0.7 * scalar]);
    colorCube([0.4 + chair2XAdj, 0 + chair2YAdj, 0], [0.6 * scalar, 0.2 * scalar, 0.7 * scalar]);

    // back rest
    colorCube([0.4 + chair2XAdj, 0.25 + chair2YAdj, -0.225], [0.6 * scalar, 0.5 * scalar, 0.2 * scalar]);

    //
    // Bookshelf
    //

    //back
    colorCube([0 + bookshelfXAdj,0,0],     [0.7,1.5,0.1]);

    // shelves
    colorCube([0 + bookshelfXAdj,0.75,0.2], [0.7,0.05,0.5]);
    colorCube([0 + bookshelfXAdj,0.45,0.2], [0.7,0.05,0.5]);
    colorCube([0 + bookshelfXAdj,0.15,0.2], [0.7,0.05,0.5]);
    colorCube([0 + bookshelfXAdj,-0.15,0.2], [0.7,0.05,0.5]);
    colorCube([0 + bookshelfXAdj,-0.45,0.2], [0.7,0.05,0.5]);
    colorCube([0 + bookshelfXAdj,-0.75,0.2], [0.7,0.05,0.5]);

    //sides
    colorCube([-0.35 + bookshelfXAdj,-0.025,0.2], [0.05,1.6,0.5]);
    colorCube([0.35 + bookshelfXAdj,-0.025,0.2], [0.05,1.6,0.5]);

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

// buttons for viewing parameters

    document.getElementById("Button1").onclick = function(event) {
        camera = 1;
    };

    document.getElementById("Button2").onclick = function(event) {
        camera = 2;
    };

    document.getElementById("Button3").onclick = function(event) {
        camera = 3;
    };

    render();
}

function colorCube(pos, scale)
{
    quad( 1, 0, 3, 2, pos, scale); //front
    quad( 2, 3, 7, 6, pos, scale); //right side
    quad( 3, 0, 4, 7, pos, scale); //bottom
    quad( 6, 5, 1, 2, pos, scale); //top
    quad( 4, 5, 6, 7, pos, scale); //back
    quad( 5, 4, 0, 1, pos, scale); //left
}

function quad(a, b, c, d, pos, scale)
{
    var vertexColors = [
        [ 0.71, 0.4, 0.21, 1.0 ],   // arm color
        [ 1.0, 0.65, 0.43, 1.0 ],   // front
        [ 0.71, 0.4, 0.21, 1.0 ],   // right
        [ 0.0, 0.0, 0.0, 1.0 ],     // bottom
        [ 0.63, 0.32, 0.17, 1.0 ],  // back
        [ 0.9, 0.55, 0.38, 1.0 ],   // left
        [ 1.0, 0.7, 0.5, 1.0 ],     // top
        [ 1.0, 1.0, 1.0, 1.0 ]      // white
    ];

    // We need to parition the quad into two triangles in order for
    // WebGL to be able to render it.  In this case, we create two
    // triangles from the quad indices

    //vertex color assigned by the index of the vertex

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        let currPoint = cubeVerts[indices[i]];
        let u;

        // Scaling
        u = scalem(scale[0], scale[1], scale[2]);
        currPoint = mult(u,currPoint);

        // Positioning
        u = translate(pos[0], pos[1], pos[2]);
        currPoint = mult(u,currPoint);

        points.push( currPoint );

        //colors.push( vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(vertexColors[a]);

    }
}

function render()
{

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    switch ( camera ) {
        case 1:
            eye = vec3(radius * Math.sin(theta) * Math.cos(phi), radius * Math.sin(theta + .5) * Math.sin(phi), radius * Math.cos(theta));
            //theta += Math.PI / 720;
            break;
        case 2:
            eye = vec3(radius * Math.sin(theta + 0.4) * Math.cos(phi), radius * Math.sin(theta + 0.4) * Math.sin(phi), radius * Math.cos(theta + 0.4));
            break;
        case 3:
            eye = vec3(radius * Math.sin(theta + 0.5) * Math.cos(phi + 0.6), radius * Math.sin(theta + 5.5) * Math.sin(phi + 0.6), radius * Math.cos(theta + 0.5));
            break;

    }

    modelViewMatrix = lookAt( eye, at , up );
    projectionMatrix = perspective( fovy, aspect, near, far );

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten( modelViewMatrix ) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten( projectionMatrix ) );

    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    requestAnimFrame( render );

}