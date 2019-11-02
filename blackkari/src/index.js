const express = require('express')
const schedule = require('node-schedule')
const facts = require('./facts/factService')
const clockService = require('./clock/clockService')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3000

const clock = new clockService()

app.get('/ping', (req, res) => res.send('Hello World!'))

app.get('/hasNotifications', (req, res) => res.send({notifications: clock.isThreeOClock()}))

app.get('/getImage', (req, res) => {
  const file = path.join(__dirname, "../resources/test-image.jpg")
  const s = fs.createReadStream(file)

  if (!clock.isThreeOClock()) {
    return res.status(403).end("It is not three o'clock!")
  }

  s.on('open', function () {
    res.set('Content-Type', 'image/jpeg')
    s.pipe(res)
  })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    const daily = new facts()
    daily.dailyFact()
    const scheduling = schedule.scheduleJob('* * * * *', function(){
        console.log('The answer to life, the universe, and everything!')

    })
})