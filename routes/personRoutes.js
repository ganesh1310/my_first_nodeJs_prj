const express = require('express');
const route = express.Router();
const person = require('../models/person')

//to save data at end point of '/person' from UI developer

route.post('/', async (req, res) => {
    try {
        const data = req.body //here we assume the data coming from client handled by bodyparser which store that data in req.body

        //create new document (adding row of inserted data) using mongoose model
        const newPerson = new person(data);  //setting data from client request to model we created that create one document for it (row inserted to db)

        const response = await newPerson.save(); // to wait for data should come in res body then we will save it
        console.log('Data Saved!')
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error!' });
    }
})

// to get add the person data
route.get('/', async (req , res)=>{
    try{
        const data = await person.find();
        console.log("Data fetched successfully!");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({err : 'Inernal Server Error'});
    }
})

//get specific data with parameterise ulr
route.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;  //extract worktype from client req.
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const responce = await person.find({work: workType});
            res.status(200).json(responce);
            console.log("responce fetched!")
        } else {
            res.status(400).json({ error: "Invalid workType!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Invalid workType!..." });
    }
})

//update routes
route.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedData = req.body;

        const responce = await person.findByIdAndUpdate(personId, updatedData, {
            new: true, //to return updated document
            runValidators: true //to run mongoose validations (like required , string type)
        })

        if (!responce) { //in case where user sends a wrong id for update
            return res.status(404).json({ error: "Person ID is not found!" })
        }

        console.log('data updated!');
        res.status(200).json(responce);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "error while updating!" })
    }
})

//delete record

route.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const responce = await person.findByIdAndDelete(personId);

        if(!responce) { //in case where user sends a wrong id for update
            return res.status(404).json({ error: "Person ID is not found!" })
        }

        console.log('data deleted!');
        res.status(200).json(responce);

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "error while updating!" })
    }
})

module.exports = route;