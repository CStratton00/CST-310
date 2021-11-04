const origin    = vec2(0, -1);

let currPos     = origin;
let currHeading = vec2(0, 1);

let stack       = [];
let points      = [];

// call specific tree for segment length
function F( segLen ) { // add the current position and updated position
    points.push( currPos );

    const movement = scale( segLen, currHeading );
    currPos = add( currPos, movement );
    
    points.push( currPos );
}

// blank for now
function f() {}

// Apply a positive rotation about the X-axis of xrot degrees
function plus( angle ) {
    const x1 = currHeading[0];
    const y1 = currHeading[1];

    const x2 = Math.cos( radians(angle) ) * x1 - Math.sin( radians(angle) ) * y1;
    const y2 = Math.sin( radians(angle) ) * x1 + Math.cos( radians(angle) ) * y1;

    currHeading = vec2( x2, y2 );
}

// Apply a negative rotation about the X-axis of xrot degrees
function minus( angle ) {
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
    cuurHeading = pop[1];
}

// const funcDict = {
//     'F': F,
//     'f': f,
//     '+': plus,
//     '-': minus,
//     '&': ampersand,
//     '^': carrot,
//     '|': pipe,
//     '[': lbrack,
//     ']': rbrack
// }