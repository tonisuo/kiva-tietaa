const express = require('express')
const schedule = require('node-schedule')
const facts = require('./services/facts')
const clockService = require('./services/clock')
const authService = require('./auth/auth')
const db = require('./db/db.js')
const app = express()
const port = 3000

const clock = new clockService()
const auth = new authService()
const dbInstance = new db()

app.get('/ping', (req, res) => res.send('Hello World!'))

app.use(auth.authenticate)

app.get('/hasNotifications', (req, res) => res.send({notifications: clock.isThreeOClock()}))

app.get('/getImage', (req, res) => {
  if (!clock.isThreeOClock()) {
    return res.status(403).end("It is not three o'clock!")
  }

  dbInstance.fetchImage(result => {
    let buff = Buffer.from(result.image.split(',')[1], 'base64')
    res.set('Content-Type', 'image/jpeg')
    res.send(buff)
  })
})

app.listen(port, () => {
  const fact = new facts()
  const scheduling = schedule.scheduleJob('* * * * *', function () {
    fact.dailyFact()
  })
})
