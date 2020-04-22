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
         userImag: req.user.imageUrl,
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

 //Fetch one scream
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

    exports.commentOnJoke = (req,res)=>{
        if(req.body.body.trim() === "") return res.status(400).json({error:'Must not be empty'})

        const newComment = {
            body:req.body.body,
            createdAt: new Date().toISOString(),
            jokeId: req.params.jokeId,
            userHandle:req.user.handle,
            userImage: req.user.imageUrl
        }

        db.doc(`/jokes/${req.params.jokeId}`).get()
        .then(doc=>{
            if(!doc.exists){
                return res.status(404).json({error:"Joke not found"})
            }
            return db.collection('comments').add(newComment)
            .then(()=>{
                res.json(newComment)
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({error:"Something went wrong"})
            })
        })
    }

    exports.likeJoke = (req,res)=>{
        
    }

    exports.unlikeJoke = (req,res)=>{

    }