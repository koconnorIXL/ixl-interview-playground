// obtain a JWT-enabled version of request
var request = require('google-oauth-jwt').requestWithJWT();

var GoogleSpreadsheets = require("google-spreadsheets");

var google = require("googleapis");
var graph = require('./graph');

var TokenCache = require('google-oauth-jwt').TokenCache,
    tokens = new TokenCache();


var CLIENT_ID = "867892492088-7meps3i47fm1n08d6560qh9sphmeqjo5.apps.googleusercontent.com"
var CLIENT_SECRET = "notasecret"
var oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);

// credentials used to get an oauth token for accessing the spreadsheet
var tokenCreds = {
  email: '867892492088-7meps3i47fm1n08d6560qh9sphmeqjo5@developer.gserviceaccount.com',
  // use the PEM file we generated from the downloaded key
  keyFile: 'my-key-file.pem',
  // specify the scopes you wish to access
  scopes: ['https://spreadsheets.google.com/feeds']
}

var spreadsheetNames = {
  'ELA Generators': 'ela',
  'Math Generators': 'math',
  'Science Generators': 'science',
  'Social Studies Generators': 'social studies'
};

function getValue(row, key) {
  if (typeof row[key] === 'string' && row[key] !== '') {
    return row[key];
  }
  else {
    return null;
  }
}


exports.getRows = function(addRow, finished) {
  tokens.get(tokenCreds, function (err, token) {
    oauth2Client.setCredentials({access_token: token});
  
    GoogleSpreadsheets({
      key: "19kSmgsci_Lmci9F83P56KZkbUzHKqjzA6J-uJcmBKXM",
      auth: oauth2Client
    },
    function(err, spreadsheets) {
      
      var numSheets = spreadsheets.worksheets.length;
      spreadsheets.worksheets.forEach(function(spreadsheet) {
        var subject = spreadsheetNames[spreadsheet.title];
        if (!subject) { numSheets--; return; }
        spreadsheet.rows({}, function(err, rows) {
          numSheets--;
          rows.forEach(function(row) {
            var ptg = getValue(row, 'name'); 
            if (!ptg) { return; }

            ptg = {
              'name': ptg,
              'type': 'ptg',
              'subject': subject,
              'status': null
            };

            var gcs = [];
            var gc = getValue(row, 'gc');
            if (gc) {
              gcs.push({
                'name': gc,
                'type': 'gc',
                'subject': subject,
                'status': getValue(row, 'statusofgc')
              });
            }

            var qms = [];
            var qm = getValue(row, 'qmcomponents');
            if (qm) {
              qms.push({
                'name': qm,
                'type': 'qm',
                'subject': subject,
                'status': getValue(row, 'statusofqm')
              });
            }
            addRow(ptg, qms, gcs);
          });
          if (numSheets === 0) {
            finished();
          }
        });
      });
    });
  });
}


