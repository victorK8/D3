/* Example for Bar Chart */

/* ---- Util & Funcs ----*/
function from_json_get(data_as_json_format, label_to_get_items){
    var items = [];

    for(var i=0; i < data_as_json_format.length; i++){
        items.push(data_as_json_format[i][label_to_get_items]);
    }

    return items
}

/* ---- Data ---- */ 
data = [
    {"name": "A", "value": 5},
    {"name": "B", "value": 6},
    {"name": "C", "value": 8},
    {"name": "D", "value": 12},
    {"name": "E", "value": 7},
    {"name": "F", "value": 55}
];

 
/* ---- SET TITLE ------ */
var TitleAdded = $("#title").append("<h1> Starting with d3.js => Some Examples </h1>");


/* ---- CHART - 0 -----*/

// Chart-0 Properties 
var margin = {top: 20, right: 20, bottom: 70, left: 40};
var width = 600 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

// Scales ==> domain([]) valores como input, range([]) su equivalencia en el svg
var x = d3.scaleBand().domain(from_json_get(data,"name")).range([0, width]);
var y = d3.scaleLinear().domain([0, d3.max(from_json_get(data,"value"))]).range([height, 0]);

// Axis
var xAxis = d3.axisBottom().scale(x);
var yAxis = d3.axisLeft().scale(y).ticks(8);

// <svg></svg> into chart-0 div
var svg0 = d3.select("#chart-0").append("svg");

// Add title. <svg> <text></text> </svg>
var svg0_text = svg0.append("text")
    .attr("class","chart-title")
    .attr("x", width/2 -margin.left/1.2)
    .attr("y", margin.top)
    .text(" Bar Chart Example ");

// <svg><g></g></svg>
var svg0_g = svg0.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

// <svg><g><g class="x axis"></g></g></svg>
var svg0_g_xAxis_added = svg0_g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

// <svg><g><g class="x axis"></g><g class="y axis"></g></g></svg>
var svg0_g_yAxis_added = svg0_g.append("g")
      .attr("class", "y axis")
      .call(yAxis)

// Add bars
var svg0_bar_added = svg0_g.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d,i) { return   x(d.name) + 20; })
      .attr("width", 50)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return  height - y(d.value); });
