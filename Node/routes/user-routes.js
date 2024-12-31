const express = require('express');
const router = express.Router();
const cookieJwtAuth = require('../middleware/cookieJwtAuth');

const userController = require('../controllers/user-controller');

router.get('/admin/register/users',userController.findAll);
router.get('/:username',userController.findOne);
router.post('/register',userController.create);
router.patch('/:username',userController.update);// patch updates specific documents and put updates all documents //TODO Make :username -> JWT
router.delete('/:username',userController.delete);
router.post('/login',userController.login);
// router.post('/add',cookieJwtAuth,userController.add);

module.exports = router;
