const express = require('express');
const router = express.Router();
const cookieJwtAuth = require('../middleware/cookieJwtAuth');
const roleAuth = require('../middleware/roles');
const userPostController = require('../controllers/posts-controller');
const pagination = require('../middleware/paginator');
const User = require('../models/user-model');



router.get('/latest',cookieJwtAuth,pagination(User),userPostController.findLatestPosts);
router.get('/',cookieJwtAuth,roleAuth(['admin']),pagination(User),userPostController.findAll);
router.get('/:username',cookieJwtAuth,pagination(User),userPostController.findOne);
router.post('/:username/insert',cookieJwtAuth,userPostController.create);
router.patch('/update/:username',cookieJwtAuth,userPostController.update);
router.delete('/delete/:username',cookieJwtAuth,userPostController.delete);
router.delete('/admin/delete',cookieJwtAuth,roleAuth(['admin']),userPostController.adminDelete);



module.exports = router;