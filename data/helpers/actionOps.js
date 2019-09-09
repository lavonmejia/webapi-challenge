const actionData = require('./actionModel');
const express = require('express');
const router = express.Router();
module.exports = router;


router.get('/', (req,res) => {
actionData.get(req.params['id'])
.then((data) => {
    if (data === undefined) { res.status(404).json({ message: "The action with the specified ID does not exist." }) }
    else {
        res.status(200).json(data)
    }
})
.catch((err) => res.status(500).json({ error: "The post information could not be retrieved." }))

})

router.post('/', (req,res) => {
    actionData.update({project_id:req.body.project_id, description:req.body.description, notes: req.body.notes})
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: "The action information could not be retrieved." }))
           
}); 

router.put('/:id', (req,res) => {
    actionData.insert({project_id:req.body.project_id, description:req.body.description, notes: req.body.notes})
    .then((data) => {
        if (data === undefined) {
            res.status(404).json({message:"The action with the specified ID does not exist."})
        } else  if ((!('project_id' in req.body) || !('description' in req.body) || !('notes' in req.body)) ){
            res.status(400).json({ errorMessage: "Please provide ID, Description and Notes for the action." })
        } else {res.status(200).json(data)}
        })
    .catch((err) => res.status(500).json({error: "The action information could not be modified."}))
        
}); 

router.delete('/:id', (req,res) => {
    actionData.delete(req.params['id'])
    .then((data) => { 
        if (data === undefined) {
            res.status(404).json({message: "The action with the specified ID does not exist."})
        } else {res.status(200).json(data)}})
    .catch((err) => res.status(500).json({error: "The action could not be removed."}))
        
})




