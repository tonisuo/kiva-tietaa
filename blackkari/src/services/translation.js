const fetch = require('node-fetch')
const config = require('../config.json')

/**
 * Translates text to finnish with Yandex translation service
 */

module.exports = async function(text) {
    const request = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${config.translation.key}&text=${text}&lang=${config.translation.languageDirection}`
    console.log("Request: " + request)
    return fetch(request)
        .then(response => response.json())
        .then(data => {
            console.log(data.text[0])
            return data.text[0]

        })

}
