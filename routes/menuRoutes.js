const express = require('express');
const route = express.Router();
const menuModel = require('../models/menue')


route.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new menuModel(data);
        const response = await newMenu.save();
        console.log('Data Saved!')
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error!' });
    }
})

route.get('/', async (req , res)=>{
    try{
        const data = await menuModel.find();
        console.log("Data fetched successfully!");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({err : 'Inernal Server Error'});
    }
})

route.get('/:tasteType' , async (req , res)=>{
    try{
        const tasteType = req.params.tasteType;
    if(tasteType == 'spicy' || tasteType == 'sour' || tasteType == 'sweet'){
        const responce = await menuModel.find({taste : tasteType});
        console.log("Taste Type Fetched successfully!");
        res.status(200).json(responce);
    }else{
        console.log("Invalid Taste type...");
        res.status(404).json({error : "Bad request!"});
    }
    }catch(err){
        console.log(err);
        res.status(404).json({error : "error while fetching!"});
    }
})

module.exports = route;