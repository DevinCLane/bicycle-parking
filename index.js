const express = require('express')
const cors = require('cors')
require('dotenv').config()

// do we have an env variable called port already? if not use 5000
const PORT = process.env.PORT || 5500

// initialize express
const app = express()

// set static folder
app.use(express.static('public'))

// Routes
app.use('/api', require('./routes'))

// enable cors
app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))