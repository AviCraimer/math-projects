const network2 = {
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


const elsFromData =  (svg, elementType = "circle", dataArray) => {
    return svg
        .append("g")
        .selectAll(elementType)
        .data(dataArray)
        .enter()
        .append(elementType)
}

const makeArrowHeads = (svg, data, size, color = "black") => {
    const symMkr = d3.symbol().size(size).type( d3.symbolTriangle );
    return elsFromData(svg, "path", data)
        .attr( "d", symMkr )
        .attr( "fill", color )
}

const networkForceSim = (data = {nodes: [], links: []}, svgXY = [0,0],  onTick ) => {
    const [w, h] = svgXY

    return d3.forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
    .force("link", d3.forceLink()       // This force provides links between nodes
            .id(d => d.id)             // This provide  the id of a node
            .links(data.links)         // and this the list of links
    )
    .force("charge", d3.forceManyBody().strength(-600))   // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    .force("center", d3.forceCenter(w / 2, h / 2))     // This force attracts nodes to the center of the svg area
    .on("tick", onTick);
}

const updateLinkLines =  (linkLines) => {
    linkLines
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
}

const updateArrowheads = (arrowHeads, arrowHeadOffset) => {
    return  arrowHeads
    .attr( "transform", d =>  {

    const DX = d.target.x - d.source.x
    const DY =  d.target.y -  d.source.y

    const slope = DY / DX;

    const signDx = DX >= 0 ? -1 : 1;

    const dx = signDx * (arrowHeadOffset / Math.sqrt(1 + (slope**2)  )) //Formula derived algebraicly
    const dy = slope * dx;

    let rotationAngle = Math.atan(dx / dy) / Math.PI * 180

    rotationAngle = (d.target.y >= d.source.y) ? rotationAngle - 180 :  rotationAngle

    return `translate( ${d.target.x + dx}, ${d.target.y + dy}) rotate(${-rotationAngle})`
    })
}

const ticked = (linkLines, circles, arrowHeads, arrowHeadOffset) => () => { // The returned function is run at each iteration of the force algorithm, updating the nodes position.
    updateLinkLines(linkLines);
    circles
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    updateArrowheads(arrowHeads, arrowHeadOffset)
}

const drawNetwork2  = (data) => {
    const svg = d3.select("#demo02b");
    const circleRadius = 20;
    const svgSize = [600, 600]

    let linkLines = elsFromData(svg, "line", data.links).style("stroke", "#aaa")

    const circles = elsFromData(svg, "circle", data.nodes)
            .attr("r", circleRadius)
            .style("fill", "#69b3a2")


    const arrowHeads = makeArrowHeads(svg, data.links,  81, "red")

    networkForceSim(data, svgSize, ticked(linkLines, circles, arrowHeads, circleRadius + 5))

    return {svg, linkLines, circles, arrowHeads}

}


drawNetwork2(network2);
