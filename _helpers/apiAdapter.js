const axios = require('axios');
const https = require('https')
const fs = require('fs')

const httpsAgent = new https.Agent({
    rejectUnauthorized: false, //================ (NOTE: this will disable client verification) =====================
    cert: fs.readFileSync("./cert/cert.pem"),
    key: fs.readFileSync("./cert/key.pem")
  })


module.exports = (baseUrl) => {
    return axios.create({
        baseURL: baseUrl,
        httpsAgent, //================= SSL certification =============    
    })
}