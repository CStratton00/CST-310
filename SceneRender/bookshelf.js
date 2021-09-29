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

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];

var thetaLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //back
    colorCube([0,0,0],     [0.7,1.5,0.1]);

    // shelves
    colorCube([0,0.75,0.2], [0.7,0.05,0.5]);
    colorCube([0,0.45,0.2], [0.7,0.05,0.5]);
    colorCube([0,0.15,0.2], [0.7,0.05,0.5]);
    colorCube([0,-0.15,0.2], [0.7,0.05,0.5]);
    colorCube([0,-0.45,0.2], [0.7,0.05,0.5]);
    colorCube([0,-0.75,0.2], [0.7,0.05,0.5]);


    //sides
    colorCube([-0.35,-0.025,0.2], [0.05,1.6,0.5]);
    colorCube([0.35,-0.025,0.2], [0.05,1.6,0.5]);


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

    thetaLoc = gl.getUniformLocation(program, "theta");

    render();
}

function colorCube(pos, scale)
{
    quad( 1, 0, 3, 2, pos, scale);
    quad( 2, 3, 7, 6, pos, scale);
    quad( 3, 0, 4, 7, pos, scale);
    quad( 6, 5, 1, 2, pos, scale);
    quad( 4, 5, 6, 7, pos, scale);
    quad( 5, 4, 0, 1, pos, scale);
}

function quad(a, b, c, d, pos, scale)
{
    var vertexColors = [
        [ 0.71, 0.4, 0.21, 1.0 ],  // arm color
        [ 1.0, 0.65, 0.43, 1.0 ],  // front
        [ 0.71, 0.4, 0.21, 1.0 ],  // right
        [ 0.0, 0.0, 0.0, 1.0 ],  // bottom
        [ 0.63, 0.32, 0.17, 1.0 ],  // back
        [ 0.71, 0.4, 0.21, 1.0 ],// left
        [ 1.0, 0.7, 0.5, 1.0 ],  // top
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
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

    // theta[axis] += 0;

    theta[0] = document.getElementById('xRotation').value;
    theta[1] = document.getElementById('yRotation').value;
    theta[2] = document.getElementById('zRotation').value;

    gl.uniform3fv(thetaLoc, theta);

    gl.drawArrays( gl.TRIANGLES, 0, points.length );

    requestAnimFrame( render );
}