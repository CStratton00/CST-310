const origin        = vec2(0, 0);
const originHeading = vec2(0, -1);

let currPos        = origin;
let currHeading    = originHeading;

function drawSegment() { // add the current position and updated position
    points.push( currPos );
    changeAngle( 100 );

    let movement = scale( .1, currHeading );
    currPos = add( currPos, movement );
    
    points.push( currPos );
}

// Apply a positive rotation about the X-axis of xrot degrees
function changeAngle( angle ) {
    angle    = getRandomInt( angle );
    const x1 = currHeading[0];
    const y1 = currHeading[1];

    const x2 = Math.cos( radians(angle) ) * x1 - Math.sin( radians(angle) ) * y1;
    const y2 = Math.sin( radians(angle) ) * x1 + Math.cos( radians(angle) ) * y1;

    currHeading = vec2( x2, y2 );
}

function getRandomInt( val ) {
    min = Math.ceil( -val );
    max = Math.floor( val );

    return Math.floor( Math.random() * ( max - min ) + min );
  }