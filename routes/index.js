
exports.index = function(req, res) {
  res.render('index');
};

exports.grader = function(req, res) {
  var correct = "012";
  console.log(req);
//  console.log(req.body);
  //console.log(req.params);
  //console.log(req.body.params);
  req.on('data', function(data) {
    console.log(data.toString());
    console.log(correct);
    res.end("" + (data.toString() === correct));
  });
};



