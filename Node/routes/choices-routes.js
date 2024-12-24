const express = require('express');
const router = express.Router();

const userQuestionController = require('../controllers/questions-controller')

router.get('/',userQuestionController.findAll);
router.get('/:username',userQuestionController.findOne);
router.post('/:username/insert',userQuestionController.create);
router.patch('/:username',userQuestionController.update);
router.delete('/:username',userQuestionController.delete);

module.exports = router;