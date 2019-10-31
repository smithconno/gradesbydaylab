var penPromise = d3.json("penguins/classData.json")
penPromise.then(
function(data)
{
    console.log("works", data);
    
},
    function(err){
        console.log("broken", err);
        }
)
