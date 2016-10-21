var d3 = require('d3');

function Graph() {
  var map = {};
  var allPTGs = {} 
  var allGCs = {}; 
  var allQMs = {};

  this.add = function(ptg, qms, gcs) {
    for (var i = 0; i < qms.length; i++) {
      var qm = qms[i];
      if (allQMs[qm.name]) {
        qms.splice(i, 1, allQMs[qm.name]);
      }
    }
    for (var i = 0; i < gcs.length; i++) {
      var gc = gcs[i];
      if (allGCs[gc.name]) {
        gcs.splice(i, 1, allGCs[gc.name]);
      }
    }
    map[ptg.name] = {
      'qms': qms,
      'gcs': gcs
    };
    allPTGs[ptg.name] = ptg;
    gcs.forEach(function(gc) {
      if (!allGCs[gc.name]) {
        allGCs[gc.name] = gc; 
      }
    });
    qms.forEach(function(qm) { 
      if (!allQMs[qm.name]) { 
        allQMs[qm.name] = qm; 
      }
    });
  };

  this.getPTGs = function() { return allPTGs; }
  this.getGCs = function() { return allGCs; }
  this.getQMs = function() { return allQMs; }
  this.getMap = function() { return map; }
  this.getGraphJSON = function() {
    var allNodes = [];
    Object.keys(allPTGs).forEach(function(ptg) {
      allPTGs[ptg].index = allNodes.length;
      allNodes.push(allPTGs[ptg]);
    });
    Object.keys(allGCs).forEach(function(gc) {
      allGCs[gc].index = allNodes.length;
      allNodes.push(allGCs[gc]);
    });
    Object.keys(allQMs).forEach(function(qm) {
      allQMs[qm].index = allNodes.length;
      allNodes.push(allQMs[qm]);
    });
    var links = [];
    Object.keys(map).forEach(function(ptg) {
      var val = map[ptg];
      val.qms.forEach(function(qm) {
        links.push({
          'source': allPTGs[ptg].index,
          'target': qm.index
        });
      });
      val.gcs.forEach(function(gc) {
        links.push({
          'source': allPTGs[ptg].index,
          'target': gc.index
        });
      });
    });
    return {
      'nodes': allNodes,
      'links': links
    };
  }
}


exports.getGraph = function() {
  return new Graph();
};
