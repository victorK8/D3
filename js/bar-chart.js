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

data_2_scatter = [
    {"name": "A", "cx": 5, "cy": 10, "r": 20},
    {"name": "B", "cx": 4, "cy": 5, "r": 20},
    {"name": "B", "cx": 9, "cy": 3, "r": 50},
    {"name": "B", "cx": 1, "cy": 10, "r": 20},
    {"name": "B", "cx": 0, "cy": 8, "r": 20},
];
 
/* ---- SET TITLE ------ */
var TitleAdded = $("#title").append("<h1> Starting with d3.js => Some Examples </h1>");


/* ---- CHART - 0 (BAR CHART) -----*/

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




/* ---- CHART - 1 (SCATTER CHART) -----*/

// Chart-1 Properties 
var margin = {top: 20, right: 20, bottom: 70, left: 40};
var width = 600 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;
var x_max_step = 2;
var y_max_step = 2;


// Scales
var x = d3.scaleLinear().domain([0, x_max_step + d3.max(from_json_get(data_2_scatter,"cx"))]).range([0, width]);
var y = d3.scaleLinear().domain([0, y_max_step + d3.max(from_json_get(data_2_scatter,"cy"))]).range([height, 0]);

// Axis
var xAxis = d3.axisBottom().scale(x);
var yAxis = d3.axisLeft().scale(y);

// <svg></svg> into chart-0 div
var svg1 = d3.select("#chart-1").append("svg");

// Add title. <svg> <text></text> </svg>
var svg1_text = svg1.append("text")
    .attr("class","chart-title")
    .attr("x", width/2 -margin.left/1.2)
    .attr("y", margin.top)
    .text(" Scatter Chart Example ");

// <svg><g></g></svg>
var svg1_g = svg1.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

// <svg><g><g class="x axis"></g></g></svg>
var svg1_g_xAxis_added = svg1_g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

// <svg><g><g class="x axis"></g><g class="y axis"></g></g></svg>
var svg1_g_yAxis_added = svg1_g.append("g")
      .attr("class", "y axis")
      .call(yAxis)

// Add circles
var svg1_bar_added = svg1_g.selectAll("bar")
      .data(data_2_scatter)
    .enter().append("circle")
      .style("fill", "steelblue")
      .attr("cx", function(d) {return x(d.cx)})
      .attr("cy", function(d) {return y(d.cy);})
      .attr("r", function(d) { return  d.r});

// Add horizontal grid
ticks_vector = []
for(var i=0;i<x_max_step+d3.max(from_json_get(data_2_scatter,"cx"));i++){ticks_vector.push(i);}

var svg1_bar_added = svg1_g.selectAll("bar")
      .data(ticks_vector)
    .enter().append("rect")
      .style("fill", "black")
      .attr("x", function(d) {return x(d)})
      .attr("y",0)
      .attr("width", 0.5)
      .attr("height", height);

// Add vertical grid
ticks_vector = []
for(var i=0;i<y_max_step + d3.max(from_json_get(data_2_scatter,"cy"));i++){ticks_vector.push(i);}

var svg1_bar_added = svg1_g.selectAll("bar")
      .data(ticks_vector)
    .enter().append("rect")
      .style("fill", "red")
      .attr("x",0 )
      .attr("y",function(d) {return y(d)})
      .attr("width", width)
      .attr("height", 0.5);

/* ---- CHART - 2 (Forecasting)*/

// Get data into buffer var
data = [
    {"timestamp": 100, "temp": 20, "hum": 50, "air": 42},
    {"timestamp": 102, "temp": 22, "hum": 55, "air": 42},
    {"timestamp": 105, "temp": 23, "hum": 70, "air": 43},
    {"timestamp": 108, "temp": 20, "hum": 55, "air": 42},
    {"timestamp": 110, "temp": 25, "hum": 55, "air": 42},
];

// Chart-2 Properties 
var margin = {top: 20, right: 20, bottom: 70, left: 40};
var width = 600 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;
var x_step = 5;
var y_step = 5;
var y_max = 100;

// Scales
var x = d3.scaleLinear().domain([d3.min(from_json_get(data,"timestamp")), d3.max(from_json_get(data,"timestamp"))]).range([0, width]);
var y_hum_air = d3.scaleLinear().domain([0, y_step + y_max]).range([height, 0]);
var y_temp = d3.scaleLinear().domain([0,y_step + d3.max(from_json_get(data,"temp"))]).range([height, 0]);

// Axis
var xAxis = d3.axisBottom().scale(x);
var yAxis = d3.axisLeft().scale(y_hum_air);
var yAxis_II = d3.axisRight().scale(y_temp);

// <svg></svg> into chart-0 div
var svg2 = d3.select("#chart-2").append("svg");

// Add title. <svg> <text></text> </svg>
var svg2_text = svg2.append("text")
    .attr("class","chart-title")
    .attr("x", width/2 -margin.left/1.2)
    .attr("y", margin.top)
    .text(" Forecasting Example ");

// <svg><g></g></svg>
var svg2_g = svg2.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

// <svg><g><g class="x axis"></g></g></svg>
var svg2_g_xAxis_added = svg2_g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

// <svg><g><g class="x axis"></g><g class="y axis"></g></g></svg>
var svg2_g_yAxis_added = svg2_g.append("g")
      .attr("class", "y axis")
      .call(yAxis)

// <svg><g><g class="x axis"></g><g class="y axis"></g></g></svg>
var svg2_g_yAxis_II_added = svg2_g.append("g")
    .attr("class", "y axis II")
    .attr("transform", "translate("+ width +",0)")
    .call(yAxis_II)


// Add hum
var svg1_bar_added = svg2_g.selectAll("bar")
      .data(data)
      .enter().append("circle")
        .style("fill", "red")
        .attr("cx", function(d) {return x(d.timestamp)})
        .attr("cy", function(d) {return y_hum_air(d.hum);})
        .attr("r", 5);


// Add horizontal grid
ticks_vector = []
for(var i=0;i<d3.max(from_json_get(data,"timestamp"));i++){ticks_vector.push(i);}

var svg2_bar_added = svg2_g.selectAll("bar")
      .data(ticks_vector)
    .enter().append("rect")
      .style("fill", "black")
      .attr("x", function(d) {return x(d)})
      .attr("y",0)
      .attr("width", 0.5)
      .attr("height", height);

// Add vertical grid
ticks_vector = []
for(var i=0;i<100;i++){ticks_vector.push(i);}

var svg2_bar_added = svg2_g.selectAll("bar")
      .data(ticks_vector)
    .enter().append("rect")
      .style("fill", "red")
      .attr("x",0 )
      .attr("y",function(d) {return y_hum_air(d)})
      .attr("width", width)
      .attr("height", 0.3);
