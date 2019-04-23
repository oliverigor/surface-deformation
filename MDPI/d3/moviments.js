//////MOVIMENTOS E TRANSIÇÕES//////

var back = function() {

  var length = previousMovement.length;
  var lastMovement = previousMovement[length - 1];
  for (var i = 0; i < lastMovement.length; i++) {
    var pointMoviment = lastMovement[i];
    d3.select("#circle" + pointMoviment.id).attr("cx", pointMoviment.x).attr("cy", pointMoviment.y);
    d3.selectAll("#link" + pointMoviment.id).attr("x1", pointMoviment.x).attr("y1", pointMoviment.y);
    d3.selectAll("#link" + (pointMoviment.id - 1)).attr("x2", pointMoviment.x).attr("y2", pointMoviment.y);

    circlesPositionArray[pointMoviment.id].x = pointMoviment.x;
    circlesPositionArray[pointMoviment.id].y = pointMoviment.y;

  }

  previousMovement.pop(1);

  if (previousMovement.length == 0) {
    document.getElementById("backBtn").setAttribute("disabled", "disabled");
  }
}

function slide() {
  d3.active(this)
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.x;
    })
}

function dragmove() {
  var id = d3.select(this).attr("id").split("circle")[1];
  movePoint(id, d3.event.x, d3.event.y);
}

function dragend() {
  document.getElementById("backBtn").removeAttribute("disabled");

  var id = d3.select(this).attr("id").split("circle")[1];
  var x = d3.select(this).attr("cx");
  var y = d3.select(this).attr("cy");


  var oldPosition = circlesPositionArray[id];

  var pointsMoved = [{
    x: oldPosition.x,
    y: oldPosition.y,
    id: id
  }];

  var ddx = x - oldPosition.x;
  var ddy = y - oldPosition.y;

  circlesPositionArray[id].x = Number(x);
  circlesPositionArray[id].y = Number(y);

  pointsMoved.concat(movePointMinus(Number(id) - 1, ddx, ddy, 1, pointsMoved));
  pointsMoved.concat(movePointPlus(Number(id) + 1, ddx, ddy, 1, pointsMoved));

  previousMovement.push(pointsMoved);
}

function movePointMinus(id, ddx, ddy, quant, pointsMoved) {
  if (id < 0 || quant >= numberOfPoints / 2) {
    return pointsMoved;
  } else {
    var previousPosition = circlesPositionArray[id];

    pointsMoved.push({
      x: previousPosition.x,
      y: previousPosition.y,
      id: Number(id)
    });

    var x = previousPosition.x + ddx * calcMovement(quant);
    var y = previousPosition.y + ddy * calcMovement(quant);

    d3.select("#circle" + id).attr("cx", x).attr("cy", y);

    ddx = x - previousPosition.x;
    ddy = y - previousPosition.y;


    d3.selectAll("#link" + id).attr("x1", x).attr("y1", y);
    d3.selectAll("#link" + (id - 1)).attr("x2", x).attr("y2", y);

    circlesPositionArray[id].x = x;
    circlesPositionArray[id].y = y;

    return movePointMinus(id - 1, ddx, ddy, quant + 1, pointsMoved);
  }
}

function movePointPlus(id, ddx, ddy, quant, pointsMoved) {
  if (id >= numberOfPoints || quant >= numberOfPoints / 2) {
    return pointsMoved;
  } else {
    var previousPosition = circlesPositionArray[id];
    pointsMoved.push({
      x: previousPosition.x,
      y: previousPosition.y,
      id: Number(id)
    });
    var x = previousPosition.x + ddx * calcMovement(quant);
    var y = previousPosition.y + ddy * calcMovement(quant);

    d3.select("#circle" + id).attr("cx", x).attr("cy", y);

    ddx = x - previousPosition.x;
    ddy = y - previousPosition.y;


    d3.selectAll("#link" + id).attr("x1", x).attr("y1", y);
    d3.selectAll("#link" + (id - 1)).attr("x2", x).attr("y2", y);


    circlesPositionArray[id].x = x;
    circlesPositionArray[id].y = y;

    return movePointPlus(id + 1, ddx, ddy, quant + 1, pointsMoved);
  }
}

function movePoint(id, x, y) {
  if (id < 0 || id > numberOfPoints) {
    // stop here.
  } else {

    d3.select("#circle" + id).attr("cx", x).attr("cy", y);

    document.getElementById("insertPos").innerHTML = "";
    document.getElementById("insertPos").innerHTML = "X: " + x + " Y: " + y;

    d3.selectAll("#link" + id).attr("x1", d3.event.x).attr("y1", d3.event.y);
    d3.selectAll("#link" + (id - 1)).attr("x2", d3.event.x).attr("y2", d3.event.y);
  }
}


function calcMovement(i) {
  var affectedPoints = Math.round(numberOfPoints / 2);

  var n1 = i / affectedPoints;

  var n2 = -Math.pow(n1, k2);

  var n3 = n2 / k1;

  var n4 = Math.exp(n3);
  return n4;
}

function transparent() {
  var currentClass = d3.selectAll("circle").attr("class");
  console.log(currentClass);
  if (currentClass == "dot")
    d3.selectAll("circle").attr("class", "dot_transp");
  else
    d3.selectAll("circle").attr("class", "dot");
}
