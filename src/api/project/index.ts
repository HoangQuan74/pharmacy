import * as express from "express";
import Auth from "../../common/helper/auth";
import { memberController } from "./controllers/memberController";
import { taskController } from "./controllers/taskController";
import { projectController } from "./controllers/projectController";
import { commentController } from "./controllers/commentController";

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

//comment
router.post("/:id/tasks/:tid/comments", authInstance.auth, commentController.createComment);
router.get("/:id/tasks/:tid/comments", authInstance.auth, commentController.getComments);
router.put(
  "/comments/:cid",
  authInstance.auth,
  commentController.updateComment
);
router.delete(
  "/comments/:cid",
  authInstance.auth,
  commentController.deleteComment
);

module.exports = router;
