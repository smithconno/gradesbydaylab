var penPromise = d3.json("penguins/classData.json")

var classroom = [];

var drawGraph = function(points, xscale, yscale)
{
    d3.select("svg")
    .append('g')
    .selectAll('dot')
    .data(points)
    .enter()
    .append('circle')
    //changed the points here to keep them from being smushed
    .attr('cx', function(d) { return d.x*10+1; })
    .attr('cy', function(d) { return d.y*10+1; })
    .attr('r', 1)
    .style('fill');
}

//function that takes the day as a parameter and creates a scatter plot
//for that day.
var createScatter = function(day, data)
{
    
    var points = data.map(function(penguin, i)
    {
        //function that returns the points for the array of points (objects)
        var folder = {};
        folder.x = i;
        folder.y = penguin.quizes[day].grade;
        return folder;    
    });
    
    var screen = {width:1000, height:1000}
    var setup=function(points)
    {
        d3.select("svg")
        .attr("width", screen.width)
        .attr("height", screen.height);
        
        var xscale = d3.scaleLinear()
        xscale.domain([0, d3.max(points, function(p){return p.x})]);
        xscale.range([0, screen.width]);
        
        var yscale = d3.scaleLinear()
        yscale.domain([
                d3.min(points, function(p){return p.y}),
                d3.max(points, function(p){return p.y})]);
        yscale.range([screen.height, 0]);
        
        drawGraph(points, xscale, yscale);
        
    }
    
    setup(points);
}
var clearPoints = function()
{
    d3.select("svg *").remove();
}

var createButtons = function(quiz, i)
{
    d3.select('#buttonholder')
    .append('button')
    .text(function(d)
    {
        return 'Day ' +quiz.day;
    })
    .on('click', function(){
        clearPoints();
        createScatter(i, classroom);
    })
}




penPromise.then(
function(data)
{
    console.log("works", data);
    classroom = data;
    data[0].quizes.map(createButtons);
    createScatter(0, data);
   
    
},
function(err){
    console.log("broken", err);

});
