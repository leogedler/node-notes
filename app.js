// console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

let commandOptions = (describe, demand, alias) =>{
    return {describe, demand, alias}
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: commandOptions('Title of note', true, 't'),
        body: commandOptions('Body of note', true, 'b'),
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: commandOptions('Title of note', true, 't')
    })
    .command('remove', 'Remove a note',{
        title: commandOptions('Title of note', true, 't')
    })
    .help()
    .argv;
let command = argv._[0];
// console.log(process.argv);
// console.log('Command: ', command);
// console.log('Yargs :', argv);

if (command === 'add'){
    let note = notes.addNote(argv.title, argv.body)

    if(note){
        console.log('Note created');
        console.log('--');
        notes.logNode(note);

    }else{
        console.log('Note title taken');
    }

}else if(command === 'list'){
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note)=> notes.logNode(note));
}else if(command === 'read'){
    let note = notes.getNote(argv.title);

    if(note){
        console.log('Note found');
        console.log('--');
        notes.logNode(note);
    }else{
        console.log('Note wa not found');
    }

}else if(command === 'remove'){
    let noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? 'Note was removed': 'Note not found';
    console.log(message);
}else{
    console.log('Command not recognized');
}

