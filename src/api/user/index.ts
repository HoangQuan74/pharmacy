import * as express from 'express';
const router = express.Router();
import { userController } from './controllers/userController';
import Auth from '../../common/helper/auth';
const multer = require("multer");
const upload = multer();

const authInstance = new Auth();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get("/profile", authInstance.auth, userController.getProfile);
router.put("/update-profile", authInstance.auth, userController.updateProfile);
router.post("/upload", authInstance.auth, upload.single("file"), userController.upload);
router.put("/change-password", authInstance.auth, userController.changePassword);
router.get("/my-tasks", authInstance.auth, userController.myTasks);

module.exports = router;