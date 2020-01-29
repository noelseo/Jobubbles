// const d3 = require("D3");
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
  let scaleColor = d3.scaleOrdinal([`#323a45`, `#3f6184`, `#778899`, `#5faeb6`, `#1d456d`, `#1e3349`, `#4c5f72`, `#85888b`])

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

    // we use pack() to automatically calculate radius conveniently only
    // and get only the leaves
    let nodes = pack(root)
      .leaves() // leaves are nodes with no children
      .map(node => {
        console.log("node:", node.x, (node.x - centerX) * 2);
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
          desc: data.desc
        };
      });
    
    simulation.nodes(nodes).on("tick", ticked);

    svg.style("background-color", "transparent");



}

main.innerHTML = run();