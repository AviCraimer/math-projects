//import randomNum, makeRandomDotData, drawDotsWithLocations

const network = {
    "nodes": [
      {
        "id": 1,
        "name": "A"
      },
      {
        "id": 2,
        "name": "B"
      },
      {
        "id": 3,
        "name": "C"
      },
      {
        "id": 4,
        "name": "D"
      },
      {
        "id": 5,
        "name": "E"
      },
      {
        "id": 6,
        "name": "F"
      },
      {
        "id": 7,
        "name": "G"
      },
      {
        "id": 8,
        "name": "H"
      },
      {
        "id": 9,
        "name": "I"
      },
      {
        "id": 10,
        "name": "J"
      }
    ],
    "links": [

      {
        "source": 1,
        "target": 2
      },
      {
        "source": 1,
        "target": 5
      },
      {
        "source": 1,
        "target": 6
      },

      {
        "source": 2,
        "target": 3
      },
              {
        "source": 2,
        "target": 7
      }
      ,

      {
        "source": 3,
        "target": 4
      },
       {
        "source": 8,
        "target": 3
      }
      ,
      {
        "source": 4,
        "target": 5
      }
      ,

      {
        "source": 4,
        "target": 9
      },
      {
        "source": 5,
        "target": 10
      }
    ]
  }


// Draw 2 dots, connect with line

const drawNetwork  = (data) => {
    const svg = d3.select("#demo02");
    const circleRadius = 20;

    let linkLines = svg
        .append("g")
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "#aaa")


    var circles = svg
        .append("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
            .attr("r", circleRadius)
            .style("fill", "#69b3a2")

    const symMkr = d3.symbol().size(81).type( d3.symbolTriangle );

    const arrowHeads  = svg.append( "g" )
        .selectAll( "path" ).data(data.links).enter().append( "path" )
        .attr( "d", symMkr )
        .attr( "fill", "red" )




    var simulation = d3.forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
    .force("link", d3.forceLink()       // This force provides links between nodes
            .id(d => d.id)             // This provide  the id of a node
            .links(data.links)         // and this the list of links
    )
    .force("charge", d3.forceManyBody().strength(-600))   // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    .force("center", d3.forceCenter(svgX / 2, svgY / 2))     // This force attracts nodes to the center of the svg area
    .on("tick", ticked);

     // This function is run at each iteration of the force algorithm, updating the nodes position.
    function ticked(d) {
        linkLines
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        circles
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        const updateArrowheads = d => {
            const DX = d.target.x - d.source.x
            const DY =  d.target.y -  d.source.y

            const slope = DY / DX;

            const signDx = DX >= 0 ? -1 : 1;

            const dx = signDx * (circleRadius / Math.sqrt(1 + (slope**2)  ))
            const dy = slope * dx;

            let rotationAngle = Math.atan(dx / dy) / Math.PI * 180

            rotationAngle = (d.target.y >= d.source.y) ? rotationAngle - 180 :  rotationAngle

            return `translate( ${d.target.x + dx}, ${d.target.y + dy}) rotate(${-rotationAngle})`
        }

        arrowHeads
            .attr( "transform", updateArrowheads)

    }

    return {svg, linkLines, circles}

}


const {svg, linkLines, circles} = drawNetwork(network);
