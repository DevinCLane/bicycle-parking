const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

// Env variables
const API_BASE_URL = process.env.API_BASE_URL
const API_USER_NAME_KEY = process.env.API_USER_NAME_KEY
const API_USER_NAME_VALUE = process.env.API_USER_NAME_VALUE
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// https://api.mapbox.com/tokens/v2/{username}?access_token=YOUR_MAPBOX_ACCESS_TOKEN
router.get('/', async (req, res) => {
    try {
        const apiRes = await needle('get', `https://api.mapbox.com/tokens/v2/${API_USER_NAME_VALUE}?access_token=${API_KEY_VALUE}`);
        const data = apiRes.body
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error})
    }
}) 

module.exports = router