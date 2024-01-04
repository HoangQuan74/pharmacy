import * as express from 'express';
import Auth from '../../common/helper/auth';
import { memberController } from './controllers/memberController';
import { taskController } from './controllers/taskController';

const authInstance = new Auth();
const router = express.Router();

// router



// member of project
router.get('/:id/members', authInstance.auth, memberController.members)
router.post('/:id/members', authInstance.auth, memberController.saveMember)
router.put('/:id/members/:mid', authInstance.auth, memberController.updateMember)
router.delete('/:id/members/:mid', authInstance.auth, memberController.deleteMember)

// task
router.post('/:id/tasks', authInstance.auth, taskController.upsertTask) // api is update (if body have id) or insert
router.get('/:id/tasks', authInstance.auth, taskController.tasks)
router.get('/:id/tasks/:tid', authInstance.auth, taskController.getTaskById)
router.delete('/:id/tasks/:tid', authInstance.auth, taskController.deleteTaskById)

module.exports = router;