const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth')

const {db} = require('./util/admin')

const { getAllJokes, getRecentJokes,postOneJoke,getJoke,commentOnJoke,likeJoke,unlikeJoke,deleteJoke} = require('./handlers/jokes')
const{signup,login,uploadImage,getUserDetails,markNotificationsRead,addUserDetails,getAuthenticatedUser} = require('./handlers/users')


//Joke route
app.get('/jokes',getAllJokes)
app.get('/recentJokes',getRecentJokes)
app.post('/joke',FBAuth,postOneJoke)
app.get('/joke/:jokeId',getJoke)
app.post('/joke/:jokeId/comment',FBAuth,commentOnJoke)
app.get('/joke/:jokeId/like',FBAuth,likeJoke)
app.get('/joke/:jokeId/unlike',FBAuth,unlikeJoke)
app.delete('/joke/:jokeId',FBAuth,deleteJoke)
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
app.get('/user/:handle',getUserDetails)
app.post('/notifications',FBAuth,markNotificationsRead)

 exports.api = functions.https.onRequest(app);

 
 exports.deleteNotificationOnUnLike = functions
 .firestore.document('likes/{id}')
 .onDelete((snapshot) => {
   return db
     .doc(`/notifications/${snapshot.id}`)
     .delete()
     .catch((err) => {
       console.error(err);
       return;
     });
 });



exports.createNotificationOnComment = functions
.firestore.document('comments/{id}')
.onCreate((snapshot) => {
  return db
    .doc(`/jokes/${snapshot.data().jokeId}`)
    .get()
    .then((doc) => {
      if (
        doc.exists &&
        doc.data().userHandle !== snapshot.data().userHandle
      ) {
        return db.doc(`/notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: doc.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'comment',
          read: false,
          jokeId: doc.id
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return;
    });
});

exports.createNotificationOnLike = functions
 .firestore.document('likes/{id}')
 .onCreate((snapshot) => {
   return db
     .doc(`/jokes/${snapshot.data().jokeId}`)
     .get()
     .then((doc) => {
       if (
         doc.exists &&
         doc.data().userHandle !== snapshot.data().userHandle
       ) {
         return db.doc(`/notifications/${snapshot.id}`).set({
           createdAt: new Date().toISOString(),
           recipient: doc.data().userHandle,
           sender: snapshot.data().userHandle,
           type: 'like',
           read: false,
           jokeId: doc.id
         });
       }
     })
     .catch((err) => console.error(err));
 });

 exports.onUserImageChange = functions
 .firestore.document('/users/{userId}')
 .onUpdate((change) => {
   if (change.before.data().imageUrl !== change.after.data().imageUrl) {
     console.log('image has changed');
     const batch = db.batch();
     return db
       .collection('jokes')
       .where('userHandle', '==', change.before.data().handle)
       .get()
       .then((data) => {
         data.forEach((doc) => {
           const joke = db.doc(`/jokes/${doc.id}`);
           batch.update(joke, { userImage: change.after.data().imageUrl });
         });
         return batch.commit();
       });
   } else return true;
 });

exports.onJokeDelete = functions
 .firestore.document('/jokes/{jokeId}')
 .onDelete((snapshot, context) => {
   const jokeId = context.params.jokeId;
   const batch = db.batch();
   return db
     .collection('comments')
     .where('jokeId', '==', jokeId)
     .get()
     .then((data) => {
       data.forEach((doc) => {
         batch.delete(db.doc(`/comments/${doc.id}`));
       });
       return db
         .collection('likes')
         .where('jokeId', '==', jokeId)
         .get();
     })
     .then((data) => {
       data.forEach((doc) => {
         batch.delete(db.doc(`/likes/${doc.id}`));
       });
       return db
         .collection('notifications')
         .where('jokeId', '==', jokeId)
         .get();
     })
     .then((data) => {
       data.forEach((doc) => {
         batch.delete(db.doc(`/notifications/${doc.id}`));
       });
       return batch.commit();
     })
     .catch((err) => console.error(err));
 });