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
         createdAt:new Date().toISOString()
     };

     db
     .collection('jokes')
     .add(newJoke)
     .then((doc)=>{
         res.json({message: `document ${doc.id} created sucessfully`});
     })
     .catch(err=>{
         res.status(500).json({error: 'Something went wrong'});
         console.error(err);
     })
 }