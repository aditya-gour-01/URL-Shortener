const shortid = require('shortid');
const URL= require('../models/URL')
async function handleGenerateNewShortURL(req,res){
    const body= req.body;
    if(!body.url) return res.status(400).json({error:'url is required'}) 
    const shortID= shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[],
        //the below created by is getting its data by the middleware req.user
        //checkforAuthentication-> jwt.verify -> req.user = decodeuser
        createdBy: req.user._id,
    });
    return res.render("url",{id: shortID});
}

async function handleGetAnalytics(req,res){
    const shortId= req.params.shortId;
    const result= await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics
}