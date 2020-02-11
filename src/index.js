import data from './data';
import Legend from './legend';
import Animate from './animate';

function Jobubbles() {
    let svg = d3.select("svg");
    let width = document.body.clientWidth; // get width in pixels
    let height = +svg.attr("height");
    let centerX = width * 0.55;
    let centerY = height * 0.5;
    let focusedNode;

    // let format = d3.format(",d");

    // let scaleColor = d3.scaleOrdinal(d3.schemeCategory10);
    let scaleColor = d3.scaleOrdinal([`#789c6e`, `#4c5f72`, `#1e3349`, `#a64960`, `#29586c`, `#1d456d`, `#85888b`, `#a9845c`, `#89c7d6`]) //`#6d6e41`

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
        .filter(function (d) {
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

    // another file
    Legend(scaleColor, svg);


    // --------------------------------------------------------------------------------

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
        .html(d => d.value + ` openings`);

    infoBox
        .append("a")
        .classed("circle-overlay__bottom", true)
        .html(d => d.link)
        .attr('href', d => d.linkUrl)
        .attr("target", "_blank"); //open a new window for the link

    // --------------------------------------------------------------------------------

    // another file
    Animate(node, focusedNode, simulation, centerX, centerY);


    // --------------------------------------------------------------------------------


    function ticked() {
        node
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .select("circle")
            .attr("r", d => d.r);
    }

}

document.addEventListener('DOMContentLoaded', () => {
    Jobubbles();


    // modal
    let modalBtn = document.getElementById("top-left");
    let modal = document.querySelector(".modal");

    modalBtn.onclick = function () {
        modal.style.display = "block";
    };
    window.onclick = function (e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    };
    modal.style.display = "block";

})

// Jobubbles();


// for separating legend company names 
// for giving each g index number

// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll(".legendCells > g").forEach((el, idx) => {
//     el.setAttribute('id', idx);
//   });
// })
