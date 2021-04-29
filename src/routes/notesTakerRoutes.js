'use strict';
var path = require('path')
const fs = require('fs')
const {
	v4: uuidv4
} = require('uuid')

module.exports = function (app) {

	app.get('/notes', function (req, res) {
		res.sendFile(path.resolve('./public/notes.html'));
	});

	app.get('/', function (req, res) {
		res.sendFile(path.resolve('./public/index.html'));
	});

	app.get('/api/notes', function (req, res) {
		fs.readFile('./db/db.json', (readError, notesString) => {
			if (readError) {
				console.log("File read failed:", err)
				return
			}

			try {
				var notesData = JSON.parse(notesString);
				res.send(notesData);

			} catch (err) {
				console.log('Error parsing JSON string:', err)
			}

		})
	});

	app.post('/api/notes', function (req, res) {
		fs.readFile('./db/db.json', (readError, notesString) => {
			if (readError) {
				console.log("File read failed:", readError)
				return
			}
			try {
				var notesData = JSON.parse(notesString);
				var newNote = {
					id: uuidv4(),
					title: req.body.title,
					text: req.body.text
				}
				notesData.push(newNote);
				fs.writeFile('./db/db.json', JSON.stringify(notesData), (writeErr) => {
					if (writeErr) {
						console.log("File write failed:", writeErr);
					}
					res.send(newNote);
				});

			} catch (err) {
				console.log('Error parsing JSON string:', err)
			}

		})
	});


	app.delete('/api/notes/:id', function (req, res) {

		fs.readFile('./db/db.json', (readError, notesString) => {
			if (readError) {
				console.log("File read failed:", readError)
				return
			}

			try {
				var notesData = JSON.parse(notesString);

				notesData = notesData.filter(function (obj) {
					return obj.id !== req.params['id'];
				});
				fs.writeFile('./db/db.json', JSON.stringify(notesData), (writeErr) => {
					if (writeErr) {
						console.log("File write failed:", writeErr);
					}
					res.send(req.params['id']);
				});

			} catch (err) {
				console.log('Error parsing JSON string:', err)
			}

		})
	});

};