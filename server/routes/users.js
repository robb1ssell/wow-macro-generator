let express = require('express')
let router = express.Router()
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@wow-macro-generator-jpegy.mongodb.net/test?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
/*
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
*/


router.get('/', (req, res) => {
  res.send('user router')
})

router.post('/create', (req, res) => {
  let payload;
  const id_token = req.body.idToken;
  const client = new OAuth2Client(CLIENT_ID);
  const verify = async () => {
    const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    payload = ticket.getPayload();
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
  }
  verify()
    .then(_ => {
      console.log('payload', payload)
    })
    .catch(console.error);
  res.send('received data')
})

module.exports = router