const express = require('express')
const router = express.Router()
const {
    addTask,
    deleteTask,
    getAll,
    updateTask,
    updateStatus
} = require('../controllers/taskController')
const { protect } = require('../middleware/authMiddleware')

router.get('/getAll', getAll)
router.post('/add',protect,  addTask);
router.post('/delete',protect, deleteTask);
router.post('/update', protect, updateTask);
router.post('/updateStatus', protect, updateStatus);

module.exports = router