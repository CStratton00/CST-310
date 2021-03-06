/**
 * Draw file
 * Function to draw the trees based on the grammar
 * Grammar rules called in lcode call the functions here
 */

const origin      = vec3(0, 0, 0);
const origHeading = vec3(0, 1, 0);

let currPos       = origin;
let currHeading   = origHeading;

let size   = 1;
let jSize  = .2;

let stack  = [];
let points = [];
let colors = [];

let first  = true;

// call specific tree for segment length
function F( segLen, startPos ) { // add the current position and updated position
    if( first ) {
        currPos = startPos;
        first   = false;
    }

    // find the angle of the current heading
    heading = Math.atan2( currHeading[1], currHeading[0] ) * 180 / Math.PI - 90;

    // draw the cylinder
    drawCylinder( segLen, currPos, [0, heading], segLen / size );

    // update the current position
    let movement = scale( segLen * ( Math.random() * ( 1.2000 - 0.7000 ) + 0.700 ).toFixed( 4 ), currHeading );
    currPos = add( currPos, movement );
}

// blank for now
function f() {}

// Apply a positive rotation about the X-axis of xrot degrees
function plus( angle ) {
    angle   += Math.floor((Math.random() * 16) - 8);
    const x1 = currHeading[0];
    const y1 = currHeading[1];
    const z1 = currHeading[2];

    const x2 = Math.cos( radians(angle) ) * x1 - Math.sin( radians(angle) ) * y1;
    const y2 = Math.sin( radians(angle) ) * x1 + Math.cos( radians(angle) ) * y1;
    const z2 = 0; //Math.cos( radians(angle) ) * z1 - Math.sin( radians(angle) ) * z1;

    currHeading = vec3( x2, y2, z2 );
}

// Apply a negative rotation about the X-axis of xrot degrees
function minus( angle ) {
    angle   += Math.floor((Math.random() * 16) - 8);
    const x1 = currHeading[0];
    const y1 = currHeading[1];
    const z1 = currHeading[2];

    const x2 = Math.cos( radians(-angle) ) * x1 - Math.sin( radians(-angle) ) * y1;
    const y2 = Math.sin( radians(-angle) ) * x1 + Math.cos( radians(-angle) ) * y1;
    const z2 = 0; //Math.cos( radians(-angle) ) * z1 - Math.sin( radians(-angle) ) * z1;

    currHeading = vec3( x2, y2, z2 );
}

// blank for now
function ampersand() {}
function carrot() {}

// function fslash() {}
// function bslash() {}

// Turn around 180 degrees
function pipe() {
    const x1 = currHeading[0];
    const y1 = currHeading[1];
    const z1 = currHeading[2];

    const x2 = Math.cos( radians(180) ) * x1 - Math.sin( radians(180) ) * y1;
    const y2 = Math.sin( radians(180) ) * x1 + Math.cos( radians(180) ) * y1;
    const z2 = 0; //Math.cos( radians(180) ) * z1 - Math.sin( radians(180) ) * z1;

    currHeading = vec3( x2, y2, z2 );
}

// Push the current state of the turtle onto a pushdown stack
function lbrack() {
    stack.push( [currPos, currHeading] );
    // drawSphere( currPos, size );

    // scale the size of the branches as the tree grows
    size += 0.25;
}

// Pop the state from the top of the turtle stack, and make it the current turtle stack
function rbrack( segLen ) {
    const pop   = stack.pop();
    currPos     = pop[0];
    currHeading = pop[1];
    // drawSphere( segLen, currPos, size );

    // scale the size of the branches as the tree grows
    size -= 0.25;
}

function reset() {
    first = true;
    currHeading = origHeading;
}

function drawCylinder( len, tran, rot, scale ) {
    // create a cylinder and scale it appropriately
    const Cylinder = new cylinder( 100, 3, true );
    Cylinder.scale( len * scale, len, len * scale );

    // rotate cylinder where [0] is theta, [1] is phi, [2] is yaw
    Cylinder.rotate(rot[1], [0, 0, 1]);

    // start tree start position
    Cylinder.translate( 0, -1 + len / 2, 0 );

    // translate cylinder
    Cylinder.translate( tran[0], tran[1], tran[2] );

    points = points.concat( Cylinder.TriangleVertices );
    colors = colors.concat( Cylinder.TriangleVertexColors );
}

function drawSphere( len, tran, scale ) {
    // scale = .3;
    const Sphere = new sphere();
    Sphere.scale( jSize, jSize, jSize );

    Sphere.translate( 0, -1 / 3, 0 );
    Sphere.translate( tran[0], tran[1], tran[2] );

    points = points.concat( Sphere.TriangleVertices );
    colors = colors.concat( Sphere.TriangleVertexColors );    
}