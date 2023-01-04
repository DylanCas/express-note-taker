const routes = require('express').Router()
const fs = require('fs')
const {readFile, writeFile} = fs.promises
// used to attach keys to objects
const { v4: uuidv4 } = require('uuid');


routes.get('/notes',(req, res) => {
    readFile('db/db.json')
    .then(data => {
        res.send(data)
    })
})

routes.post('/notes',(req,res) => {
    const newNote = req.body
    // applies unique key to new note
    newNote.id = uuidv4()
    readFile('db/db.json')
    .then(data =>{
        // takes out of json to regular javascript
        return JSON.parse(data)
    }) .then(db => {
        db.push(newNote)
        // makes the object out of the text, with unique id
        return writeFile('db/db.json', JSON.stringify(db))
    }).then(response => {
        // sends json response to browser/client in a format for the computer to read
        res.json(response)
    })
})

routes.delete('/notes/:id',(req,res) => {

})

module.exports = routes