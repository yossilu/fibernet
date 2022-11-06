const asyncHandler = require('express-async-handler')
const { Task } = require('../models/taskModel')

const getAll = asyncHandler(async (req, res) => {
  
    // get all Task
    const tasks = await Task.find({});

    if (tasks) {
      res.status(201).json(tasks)
    } else {
      res.status(400)
      throw new Error('Error retrieving data')
    }
})

const addTask = asyncHandler(async (req, res) => {
    const { description, isDone, status } = req.body
    if (!description) {
      res.status(400)
      throw new Error('Please add all fields')
    }
    // Create Task
    const task = await Task.create({
        description,
        isDone,
        status
    })
  
    if (task) {
      res.status(201).json(task)
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
})

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
      res.status(400)
      throw new Error('server error')
    }
  
    // Delete Task
    const task = await Task.deleteOne({_id: id})
    const getAll = await Task.find({});
  
    if (task) {
      res.status(201).json(getAll)
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
})

const updateTask = asyncHandler(async (req, res) => {
    const { id, description } = req.body;

    if (!id || !description) {
      res.status(400)
      throw new Error('server error')
    }
  
    // update Task
    const task = await Task.findOneAndUpdate({_id:id}, {description}, {upsert: true});
    if (task) {
      res.status(201).json(
        {description}
      )
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
})

const updateStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    res.status(400)
    throw new Error('server error')
  }

  // update Task
  const task = await Task.findOneAndUpdate({_id:id}, {status}, {upsert: true});

  if (task) {
    res.status(201).json(
      {task}
    )
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

  module.exports = {
    addTask,
    deleteTask,
    getAll,
    updateTask,
    updateStatus
  }