import * as express from 'express';
const router = express.Router();
import { userController } from './controllers/userController';
import Auth from '../../common/helper/auth';

const authInstance = new Auth();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get("/profile", authInstance.auth, userController.getProfile);
router.put("/update-profile", authInstance.auth, userController.updateProfile);
//router.post("/upload", auth.auth, userController.upload);

module.exports = router;