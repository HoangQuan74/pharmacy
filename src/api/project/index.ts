import * as express from "express";
import Auth from "../../common/helper/auth";
import { memberController } from "./controllers/memberController";
import { taskController } from "./controllers/taskController";
import { projectController } from "./controllers/projectController";
import { checkListController } from "./controllers/checkListController";

const authInstance = new Auth();
const router = express.Router();

// router

//project routes
router.get("/:id", authInstance.auth, projectController.getProjectById);
router.get("/", authInstance.auth, projectController.getProjects);
router.post("/", authInstance.auth, projectController.createProject);
router.put("/:id", authInstance.auth, projectController.updateProject);
router.delete("/:id", authInstance.auth, projectController.deleteProject);

// member of project
router.get("/:id/members", authInstance.auth, memberController.members);
router.post("/:id/members", authInstance.auth, memberController.saveMember);
router.put(
  "/:id/members/:mid",
  authInstance.auth,
  memberController.updateMember
);
router.delete(
  "/:id/members/:mid",
  authInstance.auth,
  memberController.deleteMember
);

// task
router.post("/:id/tasks", authInstance.auth, taskController.upsertTask); // api is update (if body have id) or insert
router.get("/:id/tasks", authInstance.auth, taskController.tasks);
router.get("/:id/tasks/:tid", authInstance.auth, taskController.getTaskById);
router.delete(
  "/:id/tasks/:tid",
  authInstance.auth,
  taskController.deleteTaskById
);

// checkList of tasks
router.post("/:id/tasks/:tid/check-list", authInstance.auth, checkListController.upsertCheckList); // api is update (if body have id) or insert
router.get("/:id/tasks/:tid/check-list", authInstance.auth, checkListController.checkLists);
router.get("/:id/tasks/:tid/check-list/:clid", authInstance.auth, checkListController.checkListdetail);
router.delete(
  "/:id/tasks/:tid/check-list/:clid",
  authInstance.auth,
  checkListController.deleteCheckListById
);

module.exports = router;
