(function(){
  'use strict';

  var GoogleClientLogin = require('googleclientlogin').GoogleClientLogin,
    GoogleSpreadsheets = require('google-spreadsheets'),
    googleAuth = new GoogleClientLogin({
      email: process.env.G_EMAIL,
      password: process.env.G_PASS,
      service: 'spreadsheets',
      accountType: GoogleClientLogin.accountTypes.google
    });

  googleAuth.on(GoogleClientLogin.events.login, function (err, login) {
    console.log('here');
    console.log(err);
    console.log(login);
    // GoogleSpreadsheets({
    //   key: process.env.G_KEY,
    //   auth: googleAuth.getAuthId()
    // }, function(err, spreadsheet) {
    //   spreadsheet.worksheets[0].cells({
    //     range: 'R1C1:R5C6'
    //   }, function(err, cells) {
    //     // bleh!
    //   });
    // });
  });

  googleAuth.login();


})();
