
var routing_map = {
  button: {
    title: 'Buttons',
    js: ['/button.js'],
    css: ['button.css']
  }
};

exports.index = function(req, res) {
  res.render('index');
};

exports.loadQ = function(req, res) {
  var questionID = req.query.qType;
  res.render('question', { pageInfo: routing_map[questionID]  });
};

exports.grader = function(req, res) {
  var correct = "012";
  req.on('data', function(data) {
    console.log(data.toString());
    console.log(correct);
    res.end("" + (data.toString() === correct));
  });
};



