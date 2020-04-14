/* Example for Bar Chart */

// Util functions
function from_json_get(data_as_json_format, label_to_get_items){
    var items = [];

    for(dato in data_as_json_format){
        items.push(dato[label_to_get_items]);
    }

    return items
}

// Data to visualize (json format)
data = [
    {"name": "A", "value": 5},
    {"name": "B", "value": 6},
    {"name": "C", "value": 8},
    {"name": "D", "value": 12},
    {"name": "E", "value": 7}
];

 
/* 1. Set title */
var TitleAdded = $("#title").append("<h1> Bar Chart Example </h1>");

/* 2. Set Chart-0 */

// Delimite size of svg
width = 450;
height = 350;
padding = 150;

//--- Create axis ---

// Set linear scales
var scale_x = d3.scaleLinear()
.domain([0, data.length])
.range([0, width - padding]);


// Set linear scale for y-axis
var scale_y= d3.scaleLinear()
.domain([0, d3.max(from_json_get(data,"value"))])
.range([0, height - padding]);

// Create axis and adding scales
var x_axis = d3.axisBottom()
 .scale(scale_x);

var y_axis = d3.axisLeft()
 .scale(scale_y)


// ---- Create svg and append to char-0 div DOM ---
var chart_svg_0 = d3.select("#chart-0")
.append("svg")     // Append a svg
.attr("viewBox", [0, 0, width, height]) // SVG as a rectangular box (width * height)
.append("g") 
.attr("class","y-axis")
.call(y_axis)
.attr("class","x-axis")
.call(x_axis);







