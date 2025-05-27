const { defaultConfiguration } = require("express/lib/application");


var HTML = document.getElementById("myFrame");

var doSomething = function(event, data){
    console.log(event);
    console.log(data);
    alert("Frame me up before you go go");
}

for(var i = 0; i < frames.length; i ++){
    var d = FRAMES[count];
    var copy = HTML.cloneNode(true);
    copy.addEventListener("click", (e)=>{doSomething(e,d)});

    document.body.append(copy);
}

alert("PLEASE WORK!!!!");
