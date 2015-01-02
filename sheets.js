(function(){
  'use strict';

  var _ = require('underscore'),
    sheetId = process.env.SHEET_ID || 'FAKE_SHEET',
    Spreadsheet = require('edit-google-spreadsheet');

  function uploadCsv (csvData, next) {
    Spreadsheet.load({
      debug: true,
      // spreadsheetName: '2014 Receipts - Evernote',
      spreadsheetId: sheetId,
      worksheetId: 'od6',
      username: process.env.G_EMAIL || 'BAD_EMAIL',
      password: process.env.G_PASS || 'BAD_PASS'
    }, insertRow);

    function insertRow (err, spreadsheet) {
      if (err) next(err);

      _.each(csvData, function (row, j) {
        var sheetRow = {},
          cells = _.reduce(row, function(memo, cell, i){ //map each item in array to a column
            memo[i+1] = cell;
            return memo;
          }, {});

        sheetRow[j+1] = cells; //map those columned cells to a row
        spreadsheet.add(sheetRow);
      });

      spreadsheet.send(function (err) {
        //errors here!! bah!
        if(err) next(err);
        console.log('Updated sheet');
        next();
      });
    }
  }

  module.exports.uploadCsv = uploadCsv;

})();
