const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth')

const { getAllJokes, postOneJoke} = require('./handlers/jokes')
const{signup,login,uploadImage} = require('./handlers/users')


//Joke route
app.get('/jokes',getAllJokes)
app.post('/joke',FBAuth,postOneJoke)

//user route
app.post('/signup',signup)
app.post('/login',login)
app.post('/user/image',FBAuth,uploadImage)

 exports.api = functions.https.onRequest(app);