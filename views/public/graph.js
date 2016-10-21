function getNodeClassName(d) {
  var c = 'node';
  if (d.subject) {
    c += ' ' + d.subject;
  }
  if (d.status) {
    c += ' ' + d.status;
  }
  if (d.type) {
    c += ' ' + d.type;
  }
  return c;
}

function getYFromType(d) {
  if (d.type === 'ptg') {
    return 100;
  }
  else if (d.type === 'qm' || d.type === 'gc') {
    return 400;
  }
  else {
    return d.y;
  }
}

function updateCurrentInfo(d) {
  var currentInfo = d3.select('.currentInfo');
  currentInfo.select('.currentItem .entry').text(d.name);
  currentInfo.select('.currentSubject .entry').text(d.subject);
  currentInfo.select('.currentStatus .entry').text(d.status);
}


var nodeWidth = 30;
var nodeHeight = 30;
var containerWidth = 2000;
var containerHeight = 1000;

window.onload = function() {

  d3.xhr('/getGraph')
    .responseType('json')
    .get(function(err, data) {
      var graph = data.response;

      var force = d3.layout.force()
        .charge(-1000)
        .linkDistance(500)
        .linkStrength(0.001)
        .size([containerWidth, containerHeight])
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

      var svg = d3.select('body').append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight);
      
      var link = svg.selectAll('line')
        .data(graph.links)
        .enter()
          .append('line').attr('class', 'link');

      var node = svg.selectAll('rect')
        .data(graph.nodes)
        .enter()
          .append('rect')
            .text(function(d) { return d.name; })
            .attr('width', nodeWidth)
            .attr('height', nodeHeight)
            .attr('class', getNodeClassName)
            .call(force.drag);

      node.on('click', function(d) {
        if (d3.event.defaultPrevented) return; // ignore drag
        updateCurrentInfo(d);
      });

      force.on('tick', function() {
        node
          .attr("x", function(d) { return d.x; })
          .attr("y", getYFromType );
        link
          .attr("x1", function(d) { return d.source.x + nodeWidth / 2; })
          .attr("y1", function(d) { return getYFromType(d.source) + nodeHeight / 2; })
          .attr("x2", function(d) { return d.target.x + nodeWidth / 2; })
          .attr("y2", function(d) { return getYFromType(d.target) + nodeHeight / 2; });
      });
    });

    
}
