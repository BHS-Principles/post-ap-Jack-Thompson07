

var BTN = document.getElementById("myButton");

var doSomething = function(event){
    alert("CLICK");
    console.log(event);
}

for(var i = 0; i < 3; i ++){
    var newBTN = BTN.cloneNode(true);
    document.getElementById("bar").appendChild(newBTN);
    newBTN.addEventListener("click", doSomething);
}

alert("PLEASE WORK!!!!");
