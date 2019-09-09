const projectData = require('./projectModel');

const express = require('express');
const router = express.Router();
module.exports = router;


router.get('/', (req,res) => {
    projectData.get(req.params['id'])
    .then((data) => {
        if (data === undefined) { res.status(404).json({ message: "The project with the specified ID does not exist." }) }
        else {
            res.status(200).json(data)
        }
    })
    .catch((err) => res.status(500).json({ error: "The project information could not be retrieved." }))
    
    })

    router.post('/', (req,res) => {
        projectData.update(req.params['id'], {name:req.body.name, description:req.body.description})
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).json({ error: "The project information could not be retrieved." }))
               
    }); 

    router.put('/:id', (req,res) => {
        projectData.insert({name:req.body.name, description:req.body.description})
        .then((data) => {
            if (data === undefined) {
                res.status(404).json({message:"The project with the specified ID does not exist."})
            } else  if ((!('name' in req.body) || !('description' in req.body)) ){
                res.status(400).json({ errorMessage: "Please provide ID and Description for the action." })
            } else {res.status(200).json(data)}
            })
        .catch((err) => res.status(500).json({error: "The project information could not be modified."}))
            
    }); 

    router.delete('/:id', (req,res) => {
        projectData.delete(req.params['id'])
        .then((data) => { 
            if (data === undefined) {
                res.status(404).json({message: "The project with the specified ID does not exist."})
            } else {res.status(200).json(data)}})
        .catch((err) => res.status(500).json({error: "The project could not be removed."}))
            
    })

    router.get('/:id', (req,res) => {
        projectData.getProjectActions(req.params['id'])
        .then((data) => { 
            if (data === undefined) {
                res.status(404).json({message: "The project with the specified ID does not exist."})
            } else {res.status(200).json(data)}})
        .catch((err) => res.status(500).json({error: "The project could not be removed."}))
            
    })

    