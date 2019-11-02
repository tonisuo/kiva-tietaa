const fetch = require('node-fetch');
const db = require('../db/db.js')

module.exports = function() {
    this.dailyFact = getDailyFact
}

function getDailyFact() {
    const dbInstance = new db()

    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            dbInstance.save(data.text)
        })
        .catch(err =>  {console.log(err)})
    console.log("FACT OF DAYYDAYYAYAYA")
}


