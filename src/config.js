require('dotenv').config();
const env = require('./.env.example')

const config = {
    port: process.env.NODE_PORT || 3000
}

module.exports = config;