
exports.index = function(req, res) {
  res.render('index');
};

exports.grader = function(req, res) {
  console.log(req);
  console.log(req.body);

  res.end(true);
};



