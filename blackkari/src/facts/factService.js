const fetch = require('node-fetch');

module.exports = function() {
    this.dailyFact = getDailyFact
}

function getDailyFact() {
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            console.log(data.text)
        })
        .catch(err =>  {console.log(err)})
    console.log("FACT OF DAYYDAYYAYAYA")

}


