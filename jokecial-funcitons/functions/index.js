const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();

var firebaseConfig = {
    apiKey: "AIzaSyBemy0xOaazyIQoQVyDLyLYgTLEQWtBhls",
    authDomain: "jokecial-media-app.firebaseapp.com",
    databaseURL: "https://jokecial-media-app.firebaseio.com",
    projectId: "jokecial-media-app",
    storageBucket: "jokecial-media-app.appspot.com",
    messagingSenderId: "1051384739067",
    appId: "1:1051384739067:web:1e3dce97253f8a63d3ec5e",
    measurementId: "G-VZQNQVY36J"
}

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);


//Get all jokes route
app.get('/jokes',(req,res)=>{
    admin
    .firestore()
    .collection('jokes')
    .orderBy('createdAt','desc')
    .get()
    .then(data=>{

        let jokes = [];

        data.forEach(doc =>{
            jokes.push({
                screamId: doc.id,
                body:doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(jokes);
    })
    .catch(err=>console.error(err))
})

//Create new joke route
 app.post('/joke',(req,res)=>{

     const newJoke={
         body:req.body.body,
         userHandle:req.body.userHandle,
         createdAt:new Date().toISOString()
     };

     admin.firestore()
     .collection('jokes')
     .add(newJoke)
     .then(doc=>{
         res.json({message: `document ${doc.id} created sucessfully`});
     })
     .catch(err=>{
         res.status(500).json({error: 'Something went wrong'});
         console.error(err);
     })
 })

//Signup route
app.post('/signup',(req,res)=>{
    const newUser={
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        handle:req.body.handle

    };

    //Validate data
    firebase.auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
    .then(data=>{
        return res.status(201).json({message:`user ${data.user.uid} signed up successfully`});
    })
    .catch(err=>{
        console.error(err);
        return res.status(500).json({error: err.code});
    })
})


 exports.api = functions.https.onRequest(app);