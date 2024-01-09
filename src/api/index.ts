import * as express from 'express';
import Auth from '../common/helper/auth';
import { userControllers } from './controllers/userControllers';
const router = express.Router();

const authInstance = new Auth();

router.post('/users/login', userControllers.login);
router.get('/users/profile', authInstance.auth, userControllers.getProfile);
router.get('/users', authInstance.auth, userControllers.users);
router.post('/users', authInstance.auth, userControllers.saveUser)

module.exports = router;