require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const port = 8001

const {login, refresh} = require('./authentication')
const {verify} = require('./middleware')

app.use(bodyParser.json())
app.use(cookieParser())

app.post('/login', login)
app.post('/refresh', refresh)

// This males use of the middlewhere 
app.get('/testroute', verify, (req, res) => {
    console.log('Success, you are allowed to see /testroute')
    res.json({ username: 'Neil' })
    res.status(200).send()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})