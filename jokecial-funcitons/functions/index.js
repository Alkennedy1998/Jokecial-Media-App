const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth')

const { getAllJokes, postOneJoke,getJoke,commentOnJoke,likeJoke,unlikeJoke} = require('./handlers/jokes')
const{signup,login,uploadImage,addUserDetails,getAuthenticatedUser} = require('./handlers/users')


//Joke route
app.get('/jokes',getAllJokes)
app.post('/joke',FBAuth,postOneJoke)
app.get('/joke/:jokeId',getJoke)
app.post('/joke/:jokeId/comment',FBAuth,commentOnJoke)
app.get('/joke/:jokeID/like',FBAuth,likeJoke)
app.get('/joke/:jokeID/unlike',FBAuth,unlikeJoke)
//TODO 
//delete Joke
//like Joke
//unlike joke
//comment on joke




//user route
app.post('/signup',signup)
app.post('/login',login)
app.post('/user',FBAuth,addUserDetails)
app.post('/user/image',FBAuth,uploadImage)
app.get('/user',FBAuth,getAuthenticatedUser)

 exports.api = functions.https.onRequest(app);