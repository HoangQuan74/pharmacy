import * as express from 'express';
const router = express.Router();
import { userController } from './controllers/userController';
import Auth from 'src/common/helper/auth';

const auth = new Auth();

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;