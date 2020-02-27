const express = require('express');
const router = express.Router();
const List  = require('../../models/list');


// GET all list incl task of a specific board
router.get('/:boardId', async (req, res, next) => {
  try {
    const lists = await List.find({ board: req.params.boardId }).populate('tasks')
    res.json(lists)
  } catch (err) {
    res.json(err)
  }
});

// Create new lists for your board
router.post('/:boardId/new-list', async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'Please choose a name' })
    return
  }

  try {
    const newList = await List.create({ name: req.body.name, owner: req.user._id, board: req.params.boardId })
    res.json(newList)
  } catch (err) {
    res.json(err)
  }
})

// Update specific list
router.put('/:id', async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'Please choose a name' })
    return
  }

  try {
    const list = await List.findById(req.params.id)
    if (!list.owner.equals(req.user._id)) {
      res.status(400).json({ message: 'user has no access rights' });
    } else {
      await List.findByIdAndUpdate(req.params.id, { name: req.body.name })
      res.json({ message: `List with ${req.params.id} is updated successfully.` })
    }

  } catch (err) {
    res.json(err)
  }
})


// Delete specific list
router.delete('/:id', async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id)

    if (!list.owner.equals(req.user._id)) {
      res.status(400).json({ message: 'user has no access rights' });
    } else {
      await List.findByIdAndDelete({ _id: req.params.id })
      res.json({ message: `List with ${req.params.id} has been removed successfully.` })
    }

  } catch (err) {
    res.json(err)
  }
})



module.exports = router;