/* Example for Bar Chart */

/* ---- Util & Funcs ----*/
function from_json_get(data_as_json_format, label_to_get_items){
    var items = [];

    for(dato in data_as_json_format){
        items.push(dato[label_to_get_items]);
    }

    return items
}

/* ---- Data ---- */ 
data = [
    {"name": "A", "value": 5},
    {"name": "B", "value": 6},
    {"name": "C", "value": 8},
    {"name": "D", "value": 12},
    {"name": "E", "value": 7}
];

 
/* ---- SET TITLE ------ */
var TitleAdded = $("#title").append("<h1> Chart Examples </h1>");


/* ---- CHART - 0 -----*/

// Chart-0 Properties 
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Scales ==> domain([]) valores com input, range([]) su equivalencia en el svg
var x = d3.scaleLinear().domain([0, data.length]).range([0, width]);
var y = d3.scaleLinear().domain([0, d3.max()]).range([0, height]);

// Axis
var xAxis = d3.axisBottom().scale(x)
var yAxis = d3.axisLeft().scale(y).ticks(data.length);

// <svg></svg> into chart-0 div
var svg0 = d3.select("#chart-0").append("svg");

var svg0_g = svg.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

/*
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); });

*/