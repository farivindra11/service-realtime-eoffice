const axios = require('axios');
const https = require('https')
const { API_GATEWAY_EOFFICE, TIMEOUT } = process.env;


module.exports = (baseUrl) => {
    return axios.create({
        baseURL: baseUrl
    })
}