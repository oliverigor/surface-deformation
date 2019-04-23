"use strict";

var calcular = function(elem) {
  numberOfPoints = Number(document.getElementById('nPontos').value);
  k1 = Number(document.getElementById('k1').value);
  k2 = Number(document.getElementById('k2').value);

  circlesPositionArray = [];
  circles = [];
  currentXPosition = 4;
  distanceX = width / numberOfPoints;

  d3.selectAll("svg").remove();

  drawCircles();
  drawLinks();

  return false;
}


var drag = d3.behavior.drag()
  .on("drag", dragmove)
  .on("dragend", dragend);


function drawLinks() {
  for (var i = 0; i < numberOfPoints - 1; i++) {
    var link = {
      source: circlesPositionArray[i],
      target: circlesPositionArray[i + 1]
    }

    d3.selectAll("svg")
      .append("line")
      .attr("class", "link")
      .attr("x1", link.source.x)
      .attr("y1", link.source.y)
      .attr("x2", link.target.x)
      .attr("y2", link.target.y)
      .attr("id", "link" + i);
  }
}

var getPoints = function() {
  var pointsString = "";

  for (var i = 0; i < circlesPositionArray.length; i++) {
    pointsString += '' + circlesPositionArray[i].x + ' ' + circlesPositionArray[i].y + ' 0 \r\n ';
  }
  var a = document.body.appendChild(
    document.createElement("a")
  );
  
  pointsString = pointsString.replace(/\./g,",");
  a.download = "MDPIexport.txt";
  a.href = "data:text/plain;base64," + btoa(pointsString);
  a.innerHTML = "Dowload Arquivo";
}

function drawCircles() {
  for (var i = 0; i < numberOfPoints; i++) {
    circlesPositionArray.push({
      x: currentXPosition,
      y: width / 2
    });

    currentXPosition += width / numberOfPoints;
  }

  d3.select("body")
    .selectAll("div")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  for (var i = 0; i < numberOfPoints; i++) {
    d3.selectAll("svg")
      .append("circle")
      .attr("cx", circlesPositionArray[i].x)
      .attr("cy", circlesPositionArray[i].y)
      .attr("r", radius)
      .attr("id", "circle" + i)
      .attr("class", "dot")
      .call(drag);
  }

}

drawCircles();
drawLinks();
