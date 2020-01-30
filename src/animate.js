function Animate(node, focusedNode, simulation, centerX, centerY) {

    //----------------------------------------------------------------------------------
    // when clicked

    node.on("click", currentNode => {
        d3.event.stopPropagation();
        let currentTarget = d3.event.currentTarget; // the <g> el

        if (currentNode === focusedNode) { // no focusedNode or same focused node is clicked
            return;
        }

        let lastNode = focusedNode;
        focusedNode = currentNode;

        simulation.alphaTarget(0.2).restart();

        // hide all circle-overlay
        d3.selectAll(".circle-overlay").classed("hidden", true);
        d3.selectAll(".node-icon").classed("node-icon--faded", false).style("opacity", 1);

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

        d3.transition() // Start an animated transition. Circle opens
            .duration(1000)
            .ease(d3.easePolyOut)
            .tween("moveIn", () => {
                let ix = d3.interpolateNumber(currentNode.x, centerX);
                let iy = d3.interpolateNumber(currentNode.y, centerY);
                let ir = d3.interpolateNumber(currentNode.r, centerY * 0.5);
                return function (t) {
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
                .tween("moveOut", function () {
                    console.log("tweenMoveOut", focusedNode);
                    let ir = d3.interpolateNumber(focusedNode.r, focusedNode.radius);
                    return function (t) {
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

}

module.exports = Animate;