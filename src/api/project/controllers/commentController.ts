import { Request, Response } from "express";
import { ProjectService } from "../services/projectService";
import { MemberService } from "../services/memberService";
import { MemberRoles } from "../../../common/constants/userConstant";
import { TaskService } from "../services/taskService";
import { CommentService } from "../services/commentService";
import { IsNull } from "typeorm";
const Joi = require("joi");

const createComment = async (req: Request, res: Response) => {
  try {
    const userId = req.userData.id;
    const projectId = parseInt(req.params.id);
    const projectsv = new ProjectService();
    const isMember = await projectsv.isMember(projectId, userId);
    if (!isMember) {
      return res.status(400).json("You are not a member of project");
    }

    const schema = Joi.object({
      content: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const taskId = parseInt(req.params.tid);
    let parentId = undefined;
    if (Object.keys(req.query).length > 0) {
      parentId = parseInt(req.query.parent as string);
    }

    const commentsv = new CommentService();
    const comment = commentsv.create({
      taskId: taskId,
      content: value.content,
      userId: userId,
      parentId: parentId,
    });
    const result = await commentsv.save(comment);
    return res.status(201).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

const getComments = async (req: Request, res: Response) => {
  try {
    const userId = req.userData.id;
    const projectId = parseInt(req.params.id);
    const projectsv = new ProjectService();
    const isMember = await projectsv.isMember(projectId, userId);
    if (!isMember) {
      return res.status(400).json("You are not a member of project");
    }

    const taskId = parseInt(req.params.tid);
    const commentsv = new CommentService();
    const comments = await commentsv.getAll({
      where: { taskId: taskId, parentId: IsNull() },
      relations: ["replies", "replies.author", "author"],
      order: {
        createdAt: "ASC",
        replies: {
          createdAt: "ASC",
        },
      },
      select: {
        author: {
          id: true,
          displayName: true,
          fullName: true
        },
        replies: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            id: true,
            fullName: true,
            displayName: true
          }
        },
      },
    });
    return res.status(200).json(comments);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

const updateComment = async (req: Request, res: Response) => {
  try {
    const userId = req.userData.id;
    const commentId = parseInt(req.params.cid);
    const commentsv = new CommentService();

    const schema = Joi.object({
      content: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const comment = await commentsv.getOne({
      where: { id: commentId },
    });
    if (!comment) {
      return res.status(400).json("Comment not found");
    }
    if (comment.userId !== userId) {
      return res.status(400).json("You are not the author of comment");
    }
    comment.content = value.content;
    const result = await commentsv.save(comment);
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const userId = req.userData.id;
    const commentId = parseInt(req.params.cid);
    const commentsv = new CommentService();

    const comment = await commentsv.getOne({
      where: { id: commentId },
    });
    if (!comment) {
      return res.status(400).json("Comment not found");
    }
    if (comment.userId !== userId) {
      return res.status(400).json("You are not the author of comment");
    }

    const childComments = await commentsv.getAll({
      where: { parentId: commentId },
    });
    await commentsv.softRemove([...childComments, comment]);

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const commentController = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
