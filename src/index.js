import data from './data';

function run() {
  let svg = d3.select("svg");
  let width = document.body.clientWidth; // get width in pixels
  let height = +svg.attr("height"); 
  let centerX = width * 0.55;
  let centerY = height * 0.5;
  let focusedNode;

  // let format = d3.format(",d");

  // let scaleColor = d3.scaleOrdinal(d3.schemeCategory10);
  let scaleColor = d3.scaleOrdinal([`#778899`, `#3f6184`, `#4c5f72`, `#a9845c`, `#6d6e41`, `#29586c`, `#5faeb6`, `#1d456d`, `#1e3349`, `#4c5f72`, `#85888b`])

  // use the force
  let simulation = d3
    .forceSimulation()
    .force("charge", d3.forceManyBody()) //attract force
    .force("collide", d3.forceCollide(d => d.r)) //collide force
    .force("x", d3.forceX(centerX))
    .force("y", d3.forceY(centerY));
  
  // reduce number of circles on mobile screen due to slow computation
  // if (
    //   "matchMedia" in window &&
    //   window.matchMedia("(max-device-width: 767px)").matches
    // ) {
      //   data = data.filter(el => {
        //     return el.value >= 50;
        //   });
        // }
        
  // use pack to calculate radius of the circle
  let pack = d3.pack().size([width, height]).padding(2);
  let root = d3.hierarchy({ children: data }).sum(d => d.value);

  // use pack() to automatically calculate radius conveniently only
  // and get only the leaves
  let nodes = pack(root)
    .descendants() //.leaves() this gives nodes with no children
    .filter(function(d) {
      return d.depth === 1; // d.depth >= 1 to include children
    })
    .map(node => {
      const data = node.data;
      return {
        x: centerX + (node.x - centerX) * 3, 
        // magnify start position to have transition to center movement
        y: centerY + (node.y - centerY) * 3,
        r: 0, // for tweening
        radius: node.r, //original radius
        id: data.cat + "." + data.name.replace(/\s/g, "-"),
        cat: data.cat,
        name: data.name,
        value: data.value,
        icon: data.icon,
        desc: data.desc,
        link: data.link,
        linkUrl: data.linkUrl,
        children: node.children,
        parent: node.parent
      };
    });
  
  simulation.nodes(nodes).on("tick", ticked);

  // svg.style("background-color", "transparent");

  let node = svg
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .call(
      d3
        .drag()
        .on("start", d => {
          if (!d3.event.active) simulation.alphaTarget(0.2).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", d => {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        })
        .on("end", d => {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
    );

  node
    .append("circle")
    .attr("id", d => d.id)
    .attr("r", 0)
    .style("fill", d => scaleColor(d.cat)) // color by category
    .style("opacity", 0.7)
    .transition()
    .duration(300)
    // .ease(d3.easeElasticOut)
    .tween("circleIn", d => {
      let i = d3.interpolateNumber(0, d.radius);
      return t => {
        d.r = i(t);
        simulation.force("collide", d3.forceCollide(d => d.r)); 
        //collision force treats nodes as circles with a given radius, rather than points
      };
    });

  node
    .append("clipPath")
    .attr("id", d => `clip-${d.id}`)
    .append("use")
    .attr("xlink:href", d => `#${d.id}`);



  // --------------------------------------------------------------------------------
  // display text as circle icon
  node
    .filter(d => !String(d.name))
    .append("text")
    .classed("node-icon", true)
    .attr("clip-path", d => `url(#clip-${d.id})`)
    .selectAll("tspan")
    .data(d => d.icon.split(";"))
    .enter()
    // .append("tspan")
    // .attr("x", 0)
    // .attr("y", (d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10)
    // .text(name => name);


  // --------------------------------------------------------------------------------
  // display image as circle icon
  node
    .filter(d => String(d.name))
    .append("image")
    .classed("node-icon", true)
    .attr("clip-path", d => `url(#clip-${d.id})`)
    .attr("xlink:href", d => d.icon)
    .attr("x", d => -d.radius * 0.7)
    .attr("y", d => -d.radius * 0.7)
    .attr("height", d => d.radius * 2 * 0.7)
    .attr("width", d => d.radius * 2 * 0.7);

  // node
  //   .append("title")
  //   .text(d => d.cat + "::" + d.name + "\n" + format(d.value));


  // --------------------------------------------------------------------------------
  // company categories

  let legendOrdinal = d3
    .legendColor()
    .scale(scaleColor)
    .shape("circle");

  
  let legend = svg
    .append("g")
    .classed("legend-color", true)
    .attr("text-anchor", "start")
    .attr("transform", "translate(100, 100)") //left num = x axis, right num = y axis
    .style("font-size", "20px") 
    .call(legendOrdinal);
  
  // --------------------------------------------------------------------------------
  // less openings, more openings

  let sizeScale = d3
    .scaleOrdinal()
    .domain(["More openings", "Less openings"])
    .range([20, 10]);

  let legendSize = d3
    .legendSize()
    .scale(sizeScale)
    .shape("circle")
    .labelAlign("end");

  let legend2 = svg
    .append("g")
    .classed("legend-size", true)
    .attr("text-anchor", "start")
    .attr("transform", "translate(100, 400)") //left num = x axis, right num = y axis
    .style("font-size", "20px")
    .call(legendSize);

  // ---------------------------------------------------------------------------------

    
  let infoBox = node
    .append("foreignObject")
    .classed("circle-overlay hidden", true)
    .attr("x", -550 * 0.5 * 0.8) // location inside the circle
    .attr("y", -200 * 0.5 * 0.8)
    .attr("height", 350 * 0.8) // inner part
    .attr("width", 550 * 0.8) // inner part
    .append("xhtml:div")
    .classed("circle-overlay__inner", true);

  infoBox
    .append("h2")
    .classed("circle-overlay__title", true)
    .text(d => d.name);

  infoBox
    .append("p")
    .classed("circle-overlay__body", true)
    .html(d => d.desc);
  
  infoBox
    .append("a")
    .classed("circle-overlay__bottom", true)
    .html(d => d.link)
    .attr('href', d => d.linkUrl);

  //----------------------------------------------------------------------------------
  // when clicked

  node.on("click", currentNode => {
    d3.event.stopPropagation();
    let currentTarget = d3.event.currentTarget; // the <g> el

    if (currentNode === focusedNode) {
      // no focusedNode or same focused node is clicked
      return;
    }
    
    let lastNode = focusedNode;
    focusedNode = currentNode;

    simulation.alphaTarget(0.2).restart();
    
    // hide all circle-overlay
    d3.selectAll(".circle-overlay").classed("hidden", true);
    d3.selectAll(".node-icon").classed("node-icon--faded", false);

    // don't fix last node to center anymore
    if (lastNode) {
      lastNode.fx = null;
      lastNode.fy = null;
      node
        .filter((d, i) => i === lastNode.index)
        .transition()
        .duration(1000)
        .ease(d3.easePolyOut)
        .tween("circleOut", () => {
          let irl = d3.interpolateNumber(lastNode.r, lastNode.radius);
          return t => {
            lastNode.r = irl(t);
          };
        })
        .on("interrupt", () => {
          lastNode.r = lastNode.radius;
        });
    }

    d3.transition()
      .duration(1000)
      .ease(d3.easePolyOut)
      .tween("moveIn", () => {
        let ix = d3.interpolateNumber(currentNode.x, centerX);
        let iy = d3.interpolateNumber(currentNode.y, centerY);
        let ir = d3.interpolateNumber(currentNode.r, centerY * 0.5);
        return function(t) {
          currentNode.fx = ix(t);
          currentNode.fy = iy(t);
          currentNode.r = ir(t);
          simulation.force("collide", d3.forceCollide(d => d.r));
        };
      })
      .on("end", () => {
        simulation.alphaTarget(0);
        let currentGroup = d3.select(currentTarget);
        currentGroup.select(".circle-overlay").classed("hidden", false);
        currentGroup.select(".node-icon").classed("node-icon--faded", true).style("opacity", 0); // style makes the logo disappear as soon as clicked
      })
      // .on("interrupt", () => {
      //   currentNode.fx = null;
      //   currentNode.fy = null;
      //   simulation.alphaTarget(0);
      // });
  });

  // blur
  d3.select(document).on("click", () => {
    let target = d3.event.target;
    // check if click on document but not on the circle overlay
    if (!target.closest("#circle-overlay") && focusedNode) {
      focusedNode.fx = null;
      focusedNode.fy = null;
      simulation.alphaTarget(0.2).restart();
      d3.transition()
        .duration(3000)
        .ease(d3.easePolyOut)
        .tween("moveOut", function() {
          console.log("tweenMoveOut", focusedNode);
          let ir = d3.interpolateNumber(focusedNode.r, focusedNode.radius);
          return function(t) {
            focusedNode.r = ir(t);
            simulation.force("collide", d3.forceCollide(d => d.r));
          };
        })
        .on("end", () => {
          focusedNode = null;
          simulation.alphaTarget(0);
        })
        // .on("interrupt", () => {
        //   simulation.alphaTarget(0);
        // });

      // // hide all circle-overlay
      d3.selectAll(".circle-overlay").classed("hidden", true);
      d3.selectAll(".node-icon").classed("node-icon--faded", false).style("opacity", 1);
    }
  });

  function ticked() {
    node
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .select("circle")
      .attr("r", d => d.r);
  }

}

main.innerHTML = run();