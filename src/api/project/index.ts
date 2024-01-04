import * as express from 'express';
import Auth from '../../common/helper/auth';
import { memberController } from './controllers/memberController';

const authInstance = new Auth();
const router = express.Router();

// router



router.get('/:id/members', authInstance.auth, memberController.members)
router.post('/:id/members', authInstance.auth, memberController.saveMember)
router.put('/:id/members/:mid', authInstance.auth, memberController.updateMember)
router.delete('/:id/members/:mid', authInstance.auth, memberController.deleteMember)

module.exports = router;