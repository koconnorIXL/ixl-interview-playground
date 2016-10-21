var UIReviewSpreadsheets = require('./spreadsheets');
var graph = require('./graph');

exports.index = function(req, res) {
  res.render('index');
};

exports.loadGraph = function(req, res) {
  var g = new graph.getGraph();
  UIReviewSpreadsheets.getRows(
    g.add,
    function() {
      res.json(g.getGraphJSON());
    });

}

