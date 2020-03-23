let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
  res.send('user router')
})

router.post('/create', (req, res) => {
  res.send('something')
})

module.exports = router