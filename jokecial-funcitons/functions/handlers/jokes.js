const { db } = require('../util/admin');


exports.getAllJokes = (req,res)=>{
    db
    .collection('jokes')
    .orderBy('createdAt','desc')
    .get()
    .then(data=>{

        let jokes = [];

        data.forEach(doc =>{
            jokes.push({
                jokeId: doc.id,
                body:doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(jokes);
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).json({error:err.code});
    });
}

exports.postOneJoke = (req,res)=>{

    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' });
      }
       
     const newJoke={
         body:req.body.body,
         userHandle:req.user.handle,
         userImage: req.user.imageUrl,
         createdAt:new Date().toISOString(),
         likeCount:0,
         commentCount:0
     };

     db
     .collection('jokes')
     .add(newJoke)
     .then((doc)=>{
         const resJoke = newJoke;
         resJoke.jokeId = doc.id;
         res.json(resJoke);
     })
     .catch(err=>{
         res.status(500).json({error: 'Something went wrong'});
         console.error(err);
     })
 }

 //Fetch one joke
 exports.getJoke = (req,res)=>{
     let jokeData = {}
     db.doc(`/jokes/${req.params.jokeId}`).get()
        .then(doc=>{
            if(!doc.exists){
                return res.status(404).json({error: "Joke not found"})
            }
            jokeData = doc.data()
            jokeData.jokeId = doc.id;
            return db.collection('comments').orderBy('createdAt','desc').where('jokeId','==',req.params.jokeId).get()
        })
        .then(data=>{
            jokeData.comments = [];
            data.forEach(doc=>{
                jokeData.comments.push(doc.data())
            })
            return res.json(jokeData)
        })
        .catch(err=>{
            console.error(err)
            res.status(500).json({error:err.code})
        })
     }

     //Comment on a comment

     exports.commentOnJoke = (req, res) => {
        if (req.body.body.trim() === '')
          return res.status(400).json({ comment: 'Must not be empty' });
      
        const newComment = {
          body: req.body.body,
          createdAt: new Date().toISOString(),
          jokeId: req.params.jokeId,
          userHandle: req.user.handle,
          userImage: req.user.imageUrl
        };
        console.log(newComment);
      
        db.doc(`/jokes/${req.params.jokeId}`)
          .get()
          .then((doc) => {
            if (!doc.exists) {
              return res.status(404).json({ error: 'Joke not found' });
            }
            return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
          })
          .then(() => {
            return db.collection('comments').add(newComment);
          })
          .then(() => {
            res.json(newComment);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong' });
          });
      };

    exports.likeJoke = (req,res)=>{
        const likeDocument = db.collection('likes').where('userHandle',"==",req.user.handle)
        .where("jokeId","==",req.params.jokeId).limit(1)

        const jokeDocument = db.doc(`/jokes/${req.params.jokeId}`)

        let jokeData = {}

        jokeDocument.get()
        .then((doc)=>{
            if(doc.exists){
                jokeData = doc.data()
                jokeData.jokeId = doc.id
                return likeDocument.get()
            }else{
                return res.status(404).json({err: "Joke not found"})
            }
        })
        .then(data=>{
            if(data.empty){
                return db.collection('likes').add({
                    jokeId:req.params.jokeId,
                    userHandle: req.user.handle
                })
                .then(()=>{
                    jokeData.likeCount++;
                    return jokeDocument.update({likeCount: jokeData.likeCount})
                })
                .then(()=>{
                    return res.json(jokeData)
                })
            }else{
                return res.status(400).json({error: "Joke already liked"})
            }
        })
        .catch(err=>{
            console.error(err)
            res.status(500).json({error:err.code})
        })
    }

    exports.unlikeJoke = (req,res)=>{
        const likeDocument = db.collection('likes').where('userHandle',"==",req.user.handle)
        .where("jokeId","==",req.params.jokeId).limit(1)

        const jokeDocument = db.doc(`/jokes/${req.params.jokeId}`)

        let jokeData = {}

        jokeDocument.get()
        .then(doc=>{
            if(doc.exists){
                jokeData = doc.data()
                jokeData.jokeId = doc.id
                return likeDocument.get()
            }else{
                return res.status(404).json({err: "Joke not found"})
            }
        })
        .then(data=>{
            if(data.empty){
                return res.status(400).json({error: "Joke not liked"})
                
            }else{
                return db.doc(`/likes/${data.docs[0].data().id}`).delete()
                .then(()=>{
                    jokeData.likeCount--;
                    return jokeDocument.update({likeCount:jokeData.likeCount})
                })
                .then(()=>{
                    res.json(jokeData)
                })
            }
        })
        .catch(err=>{
            console.error(err)
            res.status(500).json({error:err.code})
        })
    }

    //Delete a Joke
    exports.deleteJoke = (req,res)=>{
        const document = db.doc(`/jokes/${req.params.jokeId}`)
        document.get()
        .then(doc=>{
            if(!doc.exists){
                return res.status(404).json({error:"Joke not found"})
            }
            if(doc.data().userHandle !== req.user.handle){
                return res.status(403).json({error:"Unauthorized"})
            }else{
                return document.delete();
            }
        })
        .then(()=>{
            res.json({message:"Joke deleted succesfully"})
        })
        .catch(err=>{
            console.error(err)
            return res.status(500).json({error:err.code})
        })
    }