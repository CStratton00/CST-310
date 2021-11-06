/**
 * Draw file
 * Function to draw the trees based on the grammar
 * Grammar rules called in lcode call the functions here
 */

const origin      = vec2(0, -1);
const origHeading = vec2(0, 1);

let currPos       = origin;
let currHeading   = origHeading;

let stack         = [];
let points        = [];

let first         = true;

// call specific tree for segment length
function F( segLen, startPos ) { // add the current position and updated position
    if( first ) {
        currPos = startPos;
        first   = false;
    }

    points.push( currPos );

    let movement = scale( segLen * ( Math.random() * ( 1.2000 - 0.7000 ) + 0.700 ).toFixed( 4 ), currHeading );
    currPos = add( currPos, movement );
    
    points.push( currPos );
}

// blank for now
function f() {}

// Apply a positive rotation about the X-axis of xrot degrees
function plus( angle ) {
    angle   += Math.floor((Math.random() * 30) - 16);
    const x1 = currHeading[0];
    const y1 = currHeading[1];

    const x2 = Math.cos( radians(angle) ) * x1 - Math.sin( radians(angle) ) * y1;
    const y2 = Math.sin( radians(angle) ) * x1 + Math.cos( radians(angle) ) * y1;

    currHeading = vec2( x2, y2 );
}

// Apply a negative rotation about the X-axis of xrot degrees
function minus( angle ) {
    angle   += Math.floor((Math.random() * 30) - 16);
    const x1 = currHeading[0];
    const y1 = currHeading[1];

    const x2 = Math.cos( radians(-angle) ) * x1 - Math.sin( radians(-angle) ) * y1;
    const y2 = Math.sin( radians(-angle) ) * x1 + Math.cos( radians(-angle) ) * y1;

    currHeading = vec2( x2, y2 );
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

    const x2 = Math.cos( radians(180) ) * x1 - Math.sin( radians(180) ) * y1;
    const y2 = Math.sin( radians(180) ) * x1 + Math.cos( radians(180) ) * y1;

    currHeading = vec2( x2, y2 );
}

// Push the current state of the turtle onto a pushdown stack
function lbrack() {
    stack.push([currPos, currHeading]);
}

// Pop the state from the top of the turtle stack, and make it the current turtle stack
function rbrack() {
    const pop   = stack.pop();
    currPos     = pop[0];
    currHeading = pop[1];
}

function reset() {
    first = true;
    currHeading = origHeading;
}
