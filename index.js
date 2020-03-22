const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();

require('dotenv').config()
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

console.log(DB_USERNAME, DB_PASSWORD)

const MongoClient = require('mongodb').MongoClient;
const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@wow-macro-generator-jpegy.mongodb.net/test?retryWrites=true&w=majority`
const client = new MongoClient(dbURL, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  if (err) {
    console.log(err)
  }
  else {
    console.log('Connected to MongoDB Atlas')
  }
  // perform actions on the collection object
  client.close();
  console.log('Connection closed')
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);