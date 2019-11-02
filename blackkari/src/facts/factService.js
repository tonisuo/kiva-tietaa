const fetch = require('node-fetch');
const db = require('../db/db.js')
const imgGenerator = require('../image/generateImage.js')

module.exports = function() {
    this.dailyFact = getDailyFact
}

function getDailyFact() {
    const dbInstance = new db()

    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            imgGenerator(data.text)
                .then(base64 => {
                    console.log("image " + base64)
                    dbInstance.save(data.text, base64)
                })
        })
        .catch(err =>  {console.log(err)})
}


