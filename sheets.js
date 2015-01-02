(function(){
  'use strict';

  var _ = require('underscore'),
    sheetId = process.env.SHEET_ID || '1XdznP3_6rZE0AAuYraWlqxrJd6NK80yoYY_gCChwNOk',
    Spreadsheet = require('edit-google-spreadsheet');

  function uploadCsv (csvData, next) {
    Spreadsheet.load({
      debug: true,
      // spreadsheetName: '2014 Receipts - Evernote',
      spreadsheetId: '1XdznP3_6rZE0AAuYraWlqxrJd6NK80yoYY_gCChwNOk',
      worksheetId: 'od6',
      username: process.env.G_EMAIL || 'BAD_EMAIL',
      password: process.env.G_PASS || 'BAD_PASS'
    }, insertRow);

    function insertRow (err, spreadsheet) {
      if (err) throw err;

      _.each(csvData, function (row, index) {
        sheetRow = {};
        sheetRow[index+1] = row;
        console.log('sheetRow',sheetRow);
        spreadsheet.add(sheetRow);
      });

      spreadsheet.send(function (err) {
        if(err) throw err;
        console.log("Updated Cell at row 3, column 5 to 'hello!'");
      });
    }
  }

  module.exports.uploadCsv = uploadCsv;

})();
