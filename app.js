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
app.get('/testroute', verify, () => {
    console.log('Yes you can see this page')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})