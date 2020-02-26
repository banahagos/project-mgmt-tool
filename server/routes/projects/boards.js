const express = require('express');
const router = express.Router();
const Board = require('../../models/board');

// GET all boards
router.get('/', async (req, res, next) => {
  try {
    const listOfBoards = await Board.find({ owner: req.user._id })
    res.json(listOfBoards)
  } catch (err) {
    res.json(err)
  }
});


// Create new board
router.post('/new-board', async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'Please choose a name' })
    return
  }

  try {
    const newBoard = await Board.create({ name: req.body.name, owner: req.user._id })
    res.json(newBoard)
  } catch (err) {
    res.json(err)
  }
})

// Update specific board
router.put('/:id', async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'Please choose a name' })
    return
  }

  try {
    const board = await Board.findById(req.params.id)
    if (!board.owner.equals(req.user._id)) {
      res.status(400).json({ message: 'user has no access rights' });
    } else {
      await Board.findByIdAndUpdate(req.params.id, { name: req.body.name })
      res.json({ message: `Board with ${req.params.id} is updated successfully.` })
    }

  } catch (err) {
    res.json(err)
  }
})

// Delete specific board
router.delete('/:id', async (req, res, next) => {
  try {
    const board = await Board.findById(req.params.id)

    if (!board.owner.equals(req.user._id)) {
      res.status(400).json({ message: 'user has no access rights' });
    } else {
      await Board.findByIdAndDelete({ _id: req.params.id })
      res.json({ message: `Board with ${req.params.id} has been removed successfully.` })
    }

  } catch (err) {
    res.json(err)
  }
})

module.exports = router;