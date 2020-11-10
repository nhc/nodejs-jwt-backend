const jwt = require('jsonwebtoken')

/// never do this in plain text !
let users = {
    neil: {password: 'password'},
    elliot: {password:'password'}
}

exports.login = function(req, res){
    
    let username = req.body.username
    let password = req.body.password

    // some validation on submitted fields
    if (!username || !password || users[username].password !== password){
        return res.status(401).send()
    }

    let payloadObject = {
        nickname: 'theslink',
        theme: 'red',
        extrainfo: true
    }

    //create the access token with the shorter lifespan
    let accessToken = jwt.sign(payloadObject, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    //create the refresh token with the longer lifespan
    let refreshToken = jwt.sign(payloadObject, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    })

    //store the refresh token in the user array
    users[username].refreshToken = refreshToken

    //send the access token to the client inside a cookie
    res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
    res.send()

    return res.status(200).send()
}

exports.refresh = function(req, res){
    console.log('refresh req',req);
}