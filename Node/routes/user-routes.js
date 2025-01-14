const express = require('express');
const router = express.Router();
const cookieJwtAuth = require('../middleware/cookieJwtAuth');
const roleAuth = require('../middleware/roles');

const userController = require('../controllers/user-controller');

router.get('/admin/register/users',cookieJwtAuth,roleAuth(['admin']),userController.findAll);
router.get('/:username',cookieJwtAuth,userController.findOne);
router.post('/register',userController.create);
router.patch('/:username',cookieJwtAuth,userController.update);// patch updates specific documents and put updates all documents 
router.delete('/:username',cookieJwtAuth,userController.delete);
router.post('/login',userController.login);
// router.get('/checkemail/:email',userController.checkEmail);
module.exports = router;
