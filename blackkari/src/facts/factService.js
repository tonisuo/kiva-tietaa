const fetch = require('node-fetch');
const db = require('../db/db.js')
const imgGenerator = require('../image/generateImage.js')
const translationService = require('../services/translation.js')

module.exports = function() {
    this.dailyFact = getDailyFact
}

function getDailyFact() {
    const dbInstance = new db()

    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            translationService(data.text)
                .then(translation => {
                    console.log("Translation: " + translation)
                    imgGenerator(translation)
                        .then(base64 => {
                            dbInstance.save(data.text, translation, base64)
                        })
                })

        })
        .catch(err =>  {console.log(err)})
}


