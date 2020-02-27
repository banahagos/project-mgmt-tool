const express = require('express');
const router = express.Router();
const Task = require('../../models/task');
const List = require('../../models/list');

// Create new task for your list
router.post('/:listId/new-task', async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'Please choose a name' })
    return
  }

  try {
    const newTask = await Task.create({ name: req.body.name, owner: req.user._id })
    await List.updateOne({ _id: req.params.listId }, { $push: { tasks: newTask._id } })
    res.json(newTask)

  } catch (err) {
    res.json(err)
  }
})

// Update specific task
router.put('/:id', async (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: 'Please choose a name' })
    return
  }

  try {
    const task = await Task.findById(req.params.id)
    if (!task.owner.equals(req.user._id)) {
      res.status(400).json({ message: 'user has no access rights' });
    } else {
      await Task.findByIdAndUpdate(req.params.id, { name: req.body.name })
      res.json({ message: `Task with ${req.params.id} is updated successfully.` })
    }

  } catch (err) {
    res.json(err)
  }
})

// Delete specific task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task.owner.equals(req.user._id)) {
      res.status(400).json({ message: 'user has no access rights' });
    } else {
      await Task.findByIdAndDelete({ _id: req.params.id })
      res.json({ message: `Task with ${req.params.id} has been removed successfully.` })
    }

  } catch (err) {
    res.json(err)
  }
})

module.exports = router;