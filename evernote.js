(function(){
  'use strict';
  var Evernote = require('evernote').Evernote,
    _ = require('underscore'),
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

    if (!notesMeta.notes) {
      console.error('Error: no notes found!');
      return;
    }

    var noteStrings = _.chain(notesMeta.notes)
      .map(function(note) {
        return [note.guid, note.title, note.created, 0].join(',');
      })
      .value();

    //attach headers so it is more readable csv
    var noteCsv = ['id,title,date,amount'].concat(noteStrings);

    console.log('noteCsv',noteCsv);
  });

})();
