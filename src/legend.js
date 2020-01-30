function Legend(scaleColor, svg) {
    
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
}

module.exports = Legend;