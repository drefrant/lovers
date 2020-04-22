const axios = require('axios')

const BASE_URL = 'https://love-calculator.p.rapidapi.com/getPercentage'

module.exports = {
    getLovers: (yourName, theirName) => 
axios({
        method: 'GET',
        url: BASE_URL + '/getPercentage',
        headers: {
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"love-calculator.p.rapidapi.com",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY
        },
        params: {
            fname: yourName,
            sname: theirName
        }
    })
}