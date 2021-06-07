import express from 'express';
import * as controller from '../controllers/users.controller.js';
import * as validations from '../validations/users.validate.js';
const router = express.Router();

router.get('/', controller.index);
router.get('/cookie', (req, res, next) => {
  res.cookie('user_id', 1234);
  res.send('Hello anh em');
});
router.get('/new', controller.newUser);
router.get('/search', controller.search);
router.get('/:id', controller.show);
router.post('/', validations.createUser, controller.create);

export default router;