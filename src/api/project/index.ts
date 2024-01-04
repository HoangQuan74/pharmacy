import * as express from 'express';
import Auth from 'src/common/helper/auth';
import { memberController } from './controllers/memberController';

const authInstance = new Auth();
const router = express.Router();

// router



router.get('/members', authInstance.auth, memberController.members)
router.put('/members/:id', authInstance.auth, memberController.updateMembers)

module.exports = router;