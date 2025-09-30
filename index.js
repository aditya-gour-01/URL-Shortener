const express= require('express');
const urlRoute= require('./routes/url');
const {connectToMongo}= require('./connect');
const URL= require('./models/URL')

const app= express();
const PORT= 8001;


connectToMongo('mongodb://localhost:27017/short-URL').then(()=>console.log("connected to the DB"));

app.use(express.json());
app.use('/url', urlRoute);
app.get('/:shortId',async (req,res)=>{
    const shortId= req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    }, {$push:{
        visitHistory:{timestamp: Date.now()} 
    }})
    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=> console.log(`Server started at PORT ${PORT}`))
