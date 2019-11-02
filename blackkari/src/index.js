const express = require('express')
const schedule = require('node-schedule')
const facts = require('./services/factService')
const clockService = require('./services/clockService')
const authService = require('./auth/authService')
const generateImage = require('./image/generateImage')
const path = require('path')
const fs = require('fs')
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
    let buff = Buffer.from(result.image.split(',')[1], 'base64');

    res.set('Content-Type', 'image/jpeg')
    res.send(buff)
  })
})

app.get('/generateImage', async (req, res) => {
    try {
      const base64jpeg2 = await generateImage('Puskin juuri masteriin hiuhihihhi asdash.')

      let buff = Buffer.from(base64jpeg2.split(',')[1], 'base64');

      res.set('Content-Type', 'image/jpeg')
      res.send(buff)
    } catch (e) {
        console.error(e)
        res.status(400).send('VOE PASKA')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    //const daily = new facts()
    //daily.dailyFact()
    const scheduling = schedule.scheduleJob('* * * * *  ', function(){
        console.log('The answer to life, the universe, and everything!')

    })
})
