(function(){
  'use strict';
  var Evernote = require('evernote').Evernote,
    filter = new Evernote.NoteFilter(),
    metaFilter = new Evernote.NotesMetadataResultSpec(),
    developerToken = process.env.EVERNOTE_DEV_TOKEN || 'BAD_TOKEN',
    client = new Evernote.Client({token: developerToken}),
    noteStore = client.getNoteStore();

  noteStore.findNotesMetadata(filter, 0, 100, metaFilter, function(err, notesMeta) {
    if (err) {
      console.error('err',err);
      return;
    }
    console.log('notesMeta',notesMeta);
  });

})();
