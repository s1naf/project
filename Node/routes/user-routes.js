const express = require('express');
const router = express.Router();
const cookieJwtAuth = require('../middleware/cookieJwtAuth');
const roleAuth = require('../middleware/roles');

const userController = require('../controllers/user-controller');

router.get('/admin/view',cookieJwtAuth,roleAuth(['admin']),userController.findAll);
router.delete('/admin/delete/:username', cookieJwtAuth,roleAuth(['admin']), userController.delete);
router.get('/checkemail', userController.checkEmail);
router.get('/checkusername', userController.checkUsername);
router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/:username', cookieJwtAuth, userController.findOne);
router.patch('/update/credentials', cookieJwtAuth, userController.updateUser);
router.patch('/admin/edit/role',cookieJwtAuth,roleAuth(['admin']),userController.updateRole);
// router.patch('/update/password',cookieJwtAuth,userController.updatePassword);

module.exports = router;
