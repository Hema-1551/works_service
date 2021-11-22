const express = require('express')
const router = express.Router()
const workController = require('../controller/work.controller')


// For posting the work
router.post('/post',workController.createWork);

//For getting all works

router.get('/',workController.getAllWorks);

//For retrieving single work
router.get('/:workId',workController.getWorkById)

//For deleting the work 
router.delete('/:workId',workController.deleteWorkById)

//For update work
router.put('/:workId',workController.updateWorkById)



module.exports = router