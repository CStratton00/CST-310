"use strict";

var gl;

var nRows = 50;
var nColumns = 50;

var pointsArray = [];

function semiCircle(radius, lim1, lim2, scale) {

    for( var i = 0; i < nRows; ++i ) {          // loop through all the rows

        var lon = i / nRows;                    // longitude for range [0,1]
        lon = ( lon * 2.0 - 1.0 ) * Math.PI;    // Map the value from [0,1] tp [-Pi, pi]

        for( var j = 0; j < nColumns; ++j ) {   // loop through all the columns

            var lat = j / nColumns;             // calculate linear value representing latitude in range [0,1]
            lat = ( lat * lim1 - lim2 ) * Math.PI / 2;          // map [0,1] to [-PI/2, PI/2]

            var x = radius * Math.sin( lat ) * Math.cos( lon ); // radius of 1 is then multiplied to every sin/cos value
            var y = radius * Math.sin( lat ) * Math.sin( lon );
            var z = scale * ( radius * Math.cos( lat ) );

            pointsArray.push( vec4( x, y, z, 1.0 ) );

        }

    }

}

semiCircle(1, 2, 1, 1);
semiCircle(1, 1, 2, 2);

var fColor;

var near    = -10;
var far     = 10;
var radius  = 6.0;
var theta   = 0.0;
var phi     = 0.0;
var dr      = 5.0 * Math.PI/180.0;

const black = vec4(0.0, 0.0, 0.0, 1.0);
const clear = vec4(1.0, 1.0, 1.0, 1.0);

const at    = vec3(0.0, 0.0, 0.0);
const up    = vec3(0.0, 1.0, 0.0);

var left    = -2.0;
var right   = 2.0;
var ytop    = 2.0;
var bottom  = -2.0;

var modelViewMatrix,    projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;


window.onload = function init() {

    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1.0, 2.0);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    var vBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    fColor = gl.getUniformLocation(program, "fColor");

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    // buttons for moving viewer and changing size

    document.getElementById("Button1").onclick = function() { near  *= 1.1; far *= 1.1; };
    document.getElementById("Button2").onclick = function() { near  *= 0.9; far *= 0.9; };
    document.getElementById("Button3").onclick = function() { radius    *= 2.0; };
    document.getElementById("Button4").onclick = function() { radius    *= 0.5; };
    document.getElementById("Button5").onclick = function() { theta += dr; };
    document.getElementById("Button6").onclick = function() { theta -= dr; };
    document.getElementById("Button7").onclick = function() { phi   += dr; };
    document.getElementById("Button8").onclick = function() { phi   -= dr; };
    document.getElementById("Button9").onclick = function() { left  *= 0.9; right *= 0.9; };
    document.getElementById("Button10").onclick = function(){ left  *= 1.1; right *= 1.1; };
    document.getElementById("Button11").onclick = function(){ ytop  *= 0.9; bottom *= 0.9; };
    document.getElementById("Button12").onclick = function(){ ytop  *= 1.1; bottom *= 1.1; };

    render();

}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var eye = vec3( radius * Math.sin( theta ) * Math.cos( phi ),
        radius * Math.sin( theta ) * Math.sin( phi ),
        radius * Math.cos( theta ) );

    var modelViewMatrix = lookAt( eye, at, up );
    var projectionMatrix = ortho( left, right, bottom, ytop, near, far );

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    // draw each quad as two filled clear triangles
    // and then as two black line loops

    for( var i = 0; i < pointsArray.length; i += 4 ) {

        gl.uniform4fv(fColor, flatten(clear));
        gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );
        gl.uniform4fv(fColor, flatten(black));
        gl.drawArrays( gl.LINE_LOOP, i, 4 );

    }

    requestAnimFrame(render);
}