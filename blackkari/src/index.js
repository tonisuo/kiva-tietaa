const express = require('express')
const app = express()
const port = 3000

app.get('/ping', (req, res) => res.send('Hello World!'))

app.get('/hasNotifications', (req, res) => res.send({notifications: false}))

app.get('/getImage', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
