const express = require('express')
const schedule = require('node-schedule')
const app = express()
const port = 3000

app.get('/ping', (req, res) => res.send('Hello World!'))

app.get('/hasNotifications', (req, res) => res.send({notifications: false}))

app.get('/getImage', (req, res) => res.send('Hello World!'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
    const scheduling = schedule.scheduleJob('* * * * *', function(){
        console.log('The answer to life, the universe, and everything!')
    })
})
