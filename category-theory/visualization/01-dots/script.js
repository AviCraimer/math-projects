const svgX = 600, svgY = 600;

const dots = [{id: "a", x:50 , y:50 },{id: "b", x:200 , y:100 },{id: "c", x:500 , y:400 }  ]

function randomNum (min, max) {
    const range = max - (min -1);

    return Math.floor(Math.random() * range) + min
}

const makeRandomDotData = n => {
    const dots = []
    const idBase = 'dot_';
    const offset = 20;

    for (let i = 0; i < n ; i++) {
        dots.push({
            id: idBase + (i),
            x: randomNum(0 + offset, svgX - offset ),
            y: randomNum(0 + offset, svgY - offset )
        })
    }

    return dots;
}

function drawDotsWithLocations(containerSelector, dots, radius = 5) {
    return d3.select( containerSelector )
    .selectAll( "circle" )
    .data( dots )
    .enter()
    .append( "circle" )
    .attr( "r", radius ).attr( "fill", "red" )
    .attr( "cx", function(d) { return d["x"] } )
    .attr( "cy", function(d) { return d["y"] } );
}

const updateCircles = (circles) => {
    return circles
        .attr( "cx", function(d) { return d["x"] } )
        .attr( "cy", function(d) { return d["y"] } );
}

const dotsForceSimulation = () => {
    const dots = makeRandomDotData(10);
    let circles = drawDotsWithLocations("#demo01", dots)
    d3.forceSimulation( dots )
        .velocityDecay(0.1)
        .force("fCenter", d3.forceCenter( 300, 300 ) )
        .force("collide", d3.forceCollide(7) )
        .force("many", d3.forceManyBody().strength(50) )
        .on( "tick", function() {
            updateCircles(circles)
        })
}

dotsForceSimulation()
