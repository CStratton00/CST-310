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

function colorSelect(color) {

    var couch = [
        [ 0.71, 0.4, 0.21, 1.0 ],       // color
        [ 0.819, 0.560, 0.360, 1.0 ],   // front
        [ 0.71, 0.4, 0.21, 1.0 ],       // right
        [ 0.0, 0.0, 0.0, 1.0 ],         // bottom
        [ 0.63, 0.32, 0.17, 1.0 ],      // back
        [ 0.9, 0.55, 0.38, 1.0 ],       // left
        [ 1.0, 0.7, 0.5, 1.0 ],         // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var chair = [
        [ 0.71, 0.4, 0.21, 1.0 ],   // color
        [ 0.75, .35, 0.0, 1.0 ],    // front
        [ 0.75, .35, 0.0, 1.0 ],    // right
        [ 0.75, .35, 0.0, 1.0 ],    // bottom
        [ 0.75, .35, 0.0, 1.0 ],    // back
        [ 0.75, .35, 0.0, 1.0 ],    // left
        [ 0.75, .35, 0.0, 1.0 ],    // top
        [ 1.0, 1.0, 1.0, 1.0 ]      // white
    ];

    var bookshelf = [
        [ 0.376, 0.2, 0.062, 1.0 ],     // color
        [ 0.819, 0.560, 0.360, 1.0 ],   // front
        [ 0.376, 0.2, 0.062, 1.0 ],     // right
        [ 0.28, 0.15, 0.06, 1.0 ],      // bottom
        [ 0.63, 0.32, 0.17, 1.0 ],      // back
        [ 0.376, 0.2, 0.062, 1.0 ],     // left
        [ 1.0, 0.7, 0.5, 1.0 ],         // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var book1 = [
        [ 0.376, 0.2, 0.062, 1.0 ],     // color
        [ 0.102, 0.537, 0.961, 1.0 ],   // front
        [ 0.490, 0.639, 0.745, 1.0 ],   // right
        [ 0.871, 0.843, 0.710, 1.0 ],   // bottom
        [ 0.871, 0.843, 0.710, 1.0 ],   // back
        [ 0.490, 0.639, 0.745, 1.0 ],   // left
        [ 0.871, 0.843, 0.710, 1.0 ],   // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var book2 = [
        [ 0.376, 0.2, 0.062, 1.0 ],     // color
        [ 0.294, 0.149, 0.145, 1.0 ],   // front
        [ 0.573, 0.361, 0.353, 1.0 ],   // right
        [ 0.871, 0.843, 0.710, 1.0 ],   // bottom
        [ 0.871, 0.843, 0.710, 1.0 ],   // back
        [ 0.573, 0.361, 0.353, 1.0 ],   // left
        [ 0.871, 0.843, 0.710, 1.0 ],   // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var book3 = [
        [ 0.376, 0.2, 0.062, 1.0 ],     // color
        [ 0.710, 0.263, 0.086, 1.0 ],   // front
        [ 1.000, 0.608, 0.235, 1.0 ],   // right
        [ 0.871, 0.843, 0.710, 1.0 ],   // bottom
        [ 0.871, 0.843, 0.710, 1.0 ],   // back
        [ 1.000, 0.608, 0.235, 1.0 ],   // left
        [ 0.871, 0.843, 0.710, 1.0 ],   // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var book4 = [
        [ 0.376, 0.2, 0.062, 1.0 ],     // color
        [ 0.412, 0.161, 0.835, 1.0 ],   // front
        [ 0.553, 0.294, 0.984, 1.0 ],   // right
        [ 0.871, 0.843, 0.710, 1.0 ],   // bottom
        [ 0.871, 0.843, 0.710, 1.0 ],   // back
        [ 0.553, 0.294, 0.984, 1.0 ],   // left
        [ 0.871, 0.843, 0.710, 1.0 ],   // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var tv = [
        [ 0, 0, 0, 1.0 ],
        [ 0.0, 0.0, 0.0, 1.0 ],     // front
        [ 0.0, 0.0, 0.0, 1.0 ],     // right
        [ 0.0, 0.0, 0.0, 1.0 ],     // bottom
        [ 0.0, 0.0, 0.0, 1.0 ],     // back
        [ 0.0, 0.0, 0.0, 1.0 ],     // left
        [ 0.0, 0.0, 0.0, 1.0 ],     // top
        [ 0, 0, 0, 1.0 ]
    ];

    var room = [
        [ 0.71, 0.4, 0.21, 1.0 ],       // color
        [ 0.929, 0.850, 0.792, 1.0 ],   // front
        [ 0.847, 0.737, 0.650, 1.0 ],   // right
        [ 0.627, 0.529, 0.450, 1.0 ],   // bottom
        [ 0.63, 0.32, 0.17, 1.0 ],      // back
        [ 0.847, 0.737, 0.650, 1.0 ],   // left
        [ 0.149, 0.203, 0.270, 1.0 ],   // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var airvent = [
        [ 0.71, 0.4, 0.21, 1.0 ],       // color
        [ 1.0, 1.0, 1.0, 1.0 ],         // front
        [ 1.0, 1.0, 1.0, 1.0 ],         // right
        [ 0.5, 0.5, 0.5, 1.0 ],         // bottom
        [ 0.63, 0.32, 0.17, 1.0 ],      // back
        [ 1.0, 1.0, 1.0, 1.0 ],         // left
        [ 0.149, 0.203, 0.270, 1.0 ],   // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var outlet = [
        [ 0.71, 0.4, 0.21, 1.0 ],       // color
        [ 1.0, 1.0, 1.0, 1.0 ],         // front
        [ 0.847, 0.737, 0.650, 1.0 ],   // right
        [ 0.847, 0.737, 0.650, 1.0 ],   // bottom
        [ 0.63, 0.32, 0.17, 1.0 ],      // back
        [ 0.847, 0.737, 0.650, 1.0 ],   // left
        [ 0.847, 0.737, 0.650, 1.0 ],   // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var thermoBase = [
        [ 0.71, 0.4, 0.21, 1.0 ],       // color
        [ 0.8, 0.8, 0.8, 1.0 ],         // front
        [ 0.9, 0.9, 0.9, 1.0 ],         // right
        [ 0.5, 0.5, 0.5, 1.0 ],         // bottom
        [ 0.8, 0.8, 0.8, 1.0 ],         // back
        [ 1.0, 1.0, 1.0, 1.0 ],         // left
        [ 1.0, 1.0, 1.0, 1.0 ],         // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var thermoScreen = [
        [ 0.71, 0.4, 0.21, 1.0 ],       // color
        [ 0.9, 0.9, 0.9, 1.0 ],         // front
        [ 0, 0, 0, 1.0 ],               // right
        [ 0.9, 0.9, 0.9, 1.0 ],         // bottom
        [ 0.9, 0.9, 0.9, 1.0 ],         // back
        [ 1.0, 1.0, 1.0, 1.0 ],         // left
        [ 0.9, 0.9, 0.9, 1.0 ],         // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    var thermoButtons = [
        [ 0.71, 0.4, 0.21, 1.0 ],       // color
        [ 0.514, 0.498, 0.545, 1.0 ],   // front
        [ 0.514, 0.498, 0.545, 1.0 ],   // right
        [ 0.514, 0.498, 0.545, 1.0 ],   // bottom
        [ 0.514, 0.498, 0.545, 1.0 ],   // back
        [ 0.514, 0.498, 0.545, 1.0 ],   // left
        [ 0.514, 0.498, 0.545, 1.0 ],   // top
        [ 1.0, 1.0, 1.0, 1.0 ]          // white
    ];

    switch(color) {
        case 'couch':
            return couch
        case 'bookshelf':
            return bookshelf
        case 'book1':
            return book1
        case 'book2':
            return book2
        case 'book3':
            return book3
        case 'book4':
            return book4
        case 'tv':
            return tv
        case 'room':
            return room
        case 'chair':
            return chair
        case 'airvent':
            return airvent
        case 'outlet':
            return outlet
        case 'thermoBase':
            return thermoBase
        case 'thermoScreen':
            return thermoScreen
        case 'thermoButtons':
            return thermoButtons
        default:
            return
    }

}


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

var lightPosition = vec4( 0.0, 0.95, 0.0, 0.0 );
var lightAmbient = vec4( 0.99, 0.906, 0.714, 1.0 );
var lightDiffuse = vec4( 0.99, 0.906, 0.714, 1.0 );
var lightSpecular = vec4( 0.99, 0.906, 0.714, 1.0 );

var materialAmbient = vec4( 0.8, 0.8, 0.8, 1.0 );
var materialDiffuse = vec4( 0.4, 0.4, 0.4, 1.0 );
var materialSpecular = vec4( 0.4, 0.4, 0.4, 1.0 );
var materialShininess = 1.0;

var ctm;
var ambientColor, diffuseColor, specularColor;
var modelView, projection;
var viewerPos;
var program;

var flag = true;

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    aspect = canvas.width/canvas.height;

    var chair1XAdj = 0.7;
    var chair2XAdj = -0.6;
    var chair1YAdj = -0.55;
    var chair2YAdj = -0.55;
    var bookshelfXAdj = -1.3;
    var bookshelfYAdj = -0.15;
    var bookXAdj = -1.58;
    var bookYAdj = -0.03;
    var scalar = 0.9;

    // walls
    colorCube([-1.975, 0, 0.25], [0.05, 2, 1], 'room')
    colorCube([1.975, 0, 0.25], [0.05, 2, 1], 'room')
    colorCube([0, 0.975, 0.25], [4, 0.05, 1], 'room')       // ceiling
    colorCube([0, -0.975, 0.25], [4, 0.05, 1], 'room')      // floor
    colorCube([0, 0, -0.25], [4, 2, 0.02], 'room')

    // TV
    colorCube([0.41, 0.45, 0], [0.8, 0.45, 0.05], 'tv')

    // air vent
    colorCube([-1.0, 0.96, 0.4], [0.5, 0.05, 0.4], 'airvent')

    // outlet
    colorCube([1.8, -0.7, -0.24], [0.07, 0.15, 0.05], 'outlet')

    //
    // thermostat
    //

    // base 
    colorCube([-1.95, 0, 0.4], [0.05, 0.1, 0.14], 'thermoBase')

    // screen
    colorCube([-1.945, 0.01, 0.4], [0.05, 0.04, 0.065], 'thermoScreen')

    // buttons
    colorCube([-1.945, -0.03, 0.44], [0.05, 0.015, 0.02], 'thermoButtons')
    colorCube([-1.945, -0.03, 0.41], [0.05, 0.015, 0.02], 'thermoButtons')
    colorCube([-1.945, -0.03, 0.38], [0.05, 0.015, 0.02], 'thermoButtons')
    colorCube([-1.945, -0.03, 0.35], [0.05, 0.015, 0.02], 'thermoButtons')

    //
    // chair 1
    //

    // arm rests
    colorCube([0.04 + chair1XAdj, 0 + chair1YAdj, 0], [0.2 * scalar, 0.9 * scalar ,0.7 * scalar], 'chair');
    colorCube([0.76 + chair1XAdj, 0 + chair1YAdj, 0], [0.2 * scalar, 0.9 * scalar, 0.7 * scalar], 'chair');

    // bottom cushions
    colorCube([0.4 + chair1XAdj, -0.16 + chair1YAdj, 0], [0.6 * scalar, 0.2 * scalar, 0.7 * scalar], 'chair');
    colorCube([0.4 + chair1XAdj, 0 + chair1YAdj, 0], [0.6 * scalar, 0.2 * scalar, 0.7 * scalar], 'couch');

    // back rest
    colorCube([0.4 + chair1XAdj, 0.25 + chair1YAdj, -0.225], [0.6 * scalar, 0.5 * scalar, 0.2 * scalar], 'couch');


    //
    // chair 2
    //

    // arm rests
    colorCube([0.04 + chair2XAdj, 0 + chair2YAdj, 0], [0.2 * scalar, 0.9 * scalar, 0.7 * scalar], 'chair');
    colorCube([0.76 + chair2XAdj, 0 + chair2YAdj, 0], [0.2 * scalar, 0.9 * scalar, 0.7 * scalar], 'chair');

    // bottom cushions
    colorCube([0.4 + chair2XAdj, -0.16 + chair2YAdj, 0], [0.6 * scalar, 0.2 * scalar, 0.7 * scalar], 'chair');
    colorCube([0.4 + chair2XAdj, 0 + chair2YAdj, 0], [0.6 * scalar, 0.2 * scalar, 0.7 * scalar], 'couch');

    // back rest
    colorCube([0.4 + chair2XAdj, 0.25 + chair2YAdj, -0.225], [0.6 * scalar, 0.5 * scalar, 0.2 * scalar], 'couch');

    //
    // Bookshelf
    //

    //back
    colorCube([0 + bookshelfXAdj,0+ bookshelfYAdj,0], [0.7,1.5,0.1], 'bookshelf');

    // shelves
    colorCube([0 + bookshelfXAdj,0.75+ bookshelfYAdj,0.2], [0.7,0.05,0.5], 'bookshelf');
    colorCube([0 + bookshelfXAdj,0.45+ bookshelfYAdj,0.2], [0.7,0.05,0.5], 'bookshelf');
    colorCube([0 + bookshelfXAdj,0.15+ bookshelfYAdj,0.2], [0.7,0.05,0.5], 'bookshelf');
    colorCube([0 + bookshelfXAdj,-0.15+ bookshelfYAdj,0.2], [0.7,0.05,0.5], 'bookshelf');
    colorCube([0 + bookshelfXAdj,-0.45+ bookshelfYAdj,0.2], [0.7,0.05,0.5], 'bookshelf');
    colorCube([0 + bookshelfXAdj,-0.75+ bookshelfYAdj,0.2], [0.7,0.05,0.5], 'bookshelf');

    //sides
    colorCube([-0.35 + bookshelfXAdj,-0.025+ bookshelfYAdj,0.2], [0.05,1.6,0.5], 'bookshelf');
    colorCube([0.35 + bookshelfXAdj,-0.025+ bookshelfYAdj,0.2], [0.05,1.6,0.5], 'bookshelf');

    //
    // books
    //

    // top shelf
    colorCube([0.00 + bookXAdj, 0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book1');
    colorCube([0.07 + bookXAdj, 0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book2');
    colorCube([0.14 + bookXAdj, 0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book3');
    colorCube([0.21 + bookXAdj, 0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book4');
    colorCube([0.54 + bookXAdj, 0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book2');

    // second shelf
    colorCube([0.54 + bookXAdj, 0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book1');
    colorCube([0.29 + bookXAdj, 0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book2');
    colorCube([0.22 + bookXAdj, 0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book4');
    colorCube([0.00 + bookXAdj, 0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book3');

    // third shelf
    colorCube([0.02 + bookXAdj, -0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book2');
    colorCube([0.09 + bookXAdj, -0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book4');
    colorCube([0.16 + bookXAdj, -0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book3');
    colorCube([0.23 + bookXAdj, -0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book1');
    colorCube([0.30 + bookXAdj, -0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book3');
    colorCube([0.37 + bookXAdj, -0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book2');
    colorCube([0.44 + bookXAdj, -0.15 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book4');

    // fourth shelf
    colorCube([0.12 + bookXAdj, -0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book1');
    colorCube([0.19 + bookXAdj, -0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book3');
    colorCube([0.26 + bookXAdj, -0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book4');
    colorCube([0.33 + bookXAdj, -0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book2');
    colorCube([0.40 + bookXAdj, -0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book1');
    colorCube([0.47 + bookXAdj, -0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book4');
    colorCube([0.54 + bookXAdj, -0.45 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book3');

    // bottom shelf
    colorCube([0.02 + bookXAdj, -0.75 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book1');
    colorCube([0.09 + bookXAdj, -0.75 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book3');
    colorCube([0.16 + bookXAdj, -0.75 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book1');
    colorCube([0.23 + bookXAdj, -0.75 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book2');
    colorCube([0.30 + bookXAdj, -0.75 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book4');
    colorCube([0.37 + bookXAdj, -0.75 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book3');
    colorCube([0.44 + bookXAdj, -0.75 + bookYAdj, 0.35], [0.05, 0.2, 0.17], 'book2');

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

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );


    viewerPos = vec3(0.0, 0.0, -20.0 );

    projection = ortho(-2.5, 1.5, -1.5, 1, -1000, 1000);

    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);

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

    document.getElementById("Button4").onclick = function(event) {
        camera = 4;
    };

    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );
    gl.uniform1f(gl.getUniformLocation(program, "shininess"), materialShininess);

    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"), false, flatten(projection));

    render();
}

function colorCube(pos, scale, color) {

    quad( 1, 0, 3, 2, pos, scale, color); //front
    quad( 2, 3, 7, 6, pos, scale, color); //right side
    quad( 3, 0, 4, 7, pos, scale, color); //bottom
    quad( 6, 5, 1, 2, pos, scale, color); //top
    quad( 4, 5, 6, 7, pos, scale, color); //back
    quad( 5, 4, 0, 1, pos, scale, color); //left

}

function quad(a, b, c, d, pos, scale, color) {

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

        // colors.push( vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(colorSelect(color)[a]);

    }
}

function render() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    switch ( camera ) {
        case 1:
            eye = vec3(radius * Math.sin(theta) * Math.cos(phi), radius * Math.sin(theta + 0.5) * Math.sin(phi), radius * Math.cos(theta));
            break;
        case 2:
            eye = vec3(radius * Math.sin(theta - 0.6) * Math.cos(phi), radius * Math.sin(theta - 0.4) * Math.sin(phi+0.5), radius * Math.cos(theta - 0.6));
            break;
        case 3:
            eye = vec3(radius * Math.sin(theta + 0.5) * Math.cos(phi - 0.6), radius * Math.sin(theta + 5.5) * Math.sin(phi - 0.6), radius * Math.cos(theta + 0.5));
            break;
        case 4:
            eye = vec3(radius * Math.sin(theta + 1) * Math.cos(phi), radius * Math.sin(theta + 0.5) * Math.sin(phi), radius * Math.cos(theta+1));
            break;
    }

    modelViewMatrix = lookAt( eye, at , up );
    projectionMatrix = perspective( fovy, aspect, near, far );

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten( modelViewMatrix ) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten( projectionMatrix ) );

    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    requestAnimFrame( render );

}