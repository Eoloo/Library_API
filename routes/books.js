const express = require('express');
const model = require('./../models/library');

const router = express.Router();

// CRUD Operations
//Get
router.get('/', async function(req, res){
    try {
        const data = await model.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//POST
router.post('/post', async (req, res) => {
    const data = new model({
        Book_name: req.body.Book_name,
        Category: req.body.Category,
        Author: req.body.Author,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//UPDATE

router.patch('/patch/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(id)
    console.log(updatedData)

    try {
        const dataUpdate = await model.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(dataUpdate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const data = await model.findByIdAndDelete(id)
      res.status(200).json(data);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})

module.exports=router;