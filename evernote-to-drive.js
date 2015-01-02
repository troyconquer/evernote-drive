#!/usr/bin/env node

(function(){
  'use strict';

  var evernote = require('./evernote'),
    sheets = require('./sheets');

  evernote.createCsv(function(err, csvData) {
    if (err) throw err;

    //run the jewels
    sheets.uploadCsv(csvData, function(err, result){
      if (err) throw err;

      console.log('Success evernote-data to google-drive.');
    });
  });

})();
