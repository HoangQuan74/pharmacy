import { Request, Response } from "express";
import * as Joi from "joi";
import { UserService } from "../../user/services/userService";
import { MemberService } from "../services/memberService";
import { ProjectService } from "../services/projectService";
import { firebaseAdmin } from "../../../config/firebase";
import SendGrid from "../../../config/sendgrid";
import { MemberRoles } from "../../../common/constants/userConstant";
import * as jwt from "jsonwebtoken";
import jwtObj from "../../../config/jwt";

const members = async (req: Request, res: Response) => {
  try {
    const id = req.userData.id;
    const psv = new ProjectService();
    const projectId = parseInt(req.params.id);
    const isMember = await psv.isMember(projectId, id);
    if (!isMember) {
      return res.status(400).json("You are not member of project");
    }
    const msv = new MemberService();
    const members = await msv.getMembersByProjectId(projectId);
    return res.status(200).json(members);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateMember = async (req: Request, res: Response) => {
  try {
    const id = req.userData.id;
    const memberId = parseInt(req.params.mid);
    const projectId = parseInt(req.params.id);
    const scheam = Joi.object({
      role: Joi.string().required(),
    });

    const { error, value } = scheam.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    const psv = new ProjectService();
    const project = await psv.getOne({
      where: {
        id: projectId,
      },
      relations: ["owner"],
    });
    if (!project) {
      return res.status(400).json("Project not found");
    } else if (project.owner.id !== id) {
      return res.status(400).json("You are not owner of this project");
    }
    const msv = new MemberService();
    const member = await msv.getOne({
      where: { id: memberId, projectId: projectId },
    });
    if (!member) {
      return res.status(400).json("Member not found");
    }
    member.role = value.role;
    const result = await msv.save(member);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const deleteMember = async (req: Request, res: Response) => {
  try {
    const id = req.userData.id;
    const memberId = parseInt(req.params.mid);
    const projectId = parseInt(req.params.id);

    const psv = new ProjectService();
    const project = await psv.getOne({
      where: {
        id: projectId,
      },
      relations: ["owner"],
    });
    if (!project) {
      return res.status(400).json("Project not found");
    } else if (project.owner.id !== id) {
      return res.status(400).json("You are not owner of this project");
    }
    const msv = new MemberService();
    const member = await msv.getOne({ where: { id: memberId } });
    if (!member) {
      return res.status(400).json("Member not found");
    }
    const firestore = firebaseAdmin.firestore();
    const rooms_query = firestore
      .collection("rooms")
      .where("ProjectId", "==", projectId.toString())
      .where("Members", "array-contains", memberId.toString());
    rooms_query.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
    const result = await msv.softRemove([member]);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const sendInvitation = async (req: Request, res: Response) => {
  try {
    const id = req.userData.id;
    const projectId = parseInt(req.params.id);

    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }
    const usersv = new UserService();
    const existingUser = await usersv.getOne({ where: { email: value.email } });
    if (!existingUser) return res.status(400).json("Email is not registered");
    const psv = new ProjectService();
    const membersv = new MemberService();
    const project = await psv.getOne({
      where: {
        id: projectId,
      },
      relations: ["members"],
      select: {
        members: {
          userId: true,
        },
      },
    });

    const member = await membersv.getOne({
      where: {
        userId: id,
        projectId: projectId,
      },
      relations: {
        user: true,
      },
    });
    if (!project) {
      return res.status(400).json("Project not found");
    }
    if (!member || member.role !== MemberRoles.ADMIN) {
      return res.status(400).json("You are not an admin of this project");
    }

    const token = jwt.sign(
      {
        userId: id,
        projectId: projectId,
      },
      jwtObj.secret
    );
    const acceptUrl = `https://localhost:7294/accept-invitation?token=${token}`;

    await SendGrid.send({
      to: req.body.email,
      from: process.env.EMAIL,
      templateId: process.env.SG_TEMPLATE_ID,
      dynamicTemplateData: {
        adminName: member.user.fullName,
        projectName: project.name,
        link: acceptUrl,
      },
    });

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const saveMember = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      token: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json(error);
    }

    const token = value.token;
    const result = jwt.verify(token, jwtObj.secret);
    const { projectId, userId } = result as unknown as {
      projectId: number;
      userId: number;
    };
    const projectsv = new ProjectService();
    const membersv = new MemberService();
    const project = await projectsv.getOne({
      where: {
        id: projectId,
      },
      relations: ["members"],
      select: {
        members: {
          userId: true,
        },
      },
    });
    if (!project) {
      return res.status(400).json("Project not found");
    }
    const member = await membersv.getOne({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });
    if (member) {
      return res.status(400).json("You have already been member of this project");
    }

    const us = new UserService();
    const userMember = await us.getOne({ where: { id: userId } });
    if (!userMember) {
      return res.status(400).json("user not found");
    }

    const _member = membersv.create({
      role: MemberRoles.MEMBER,
      userId: userMember.id,
      projectId: projectId,
    });
    const memberDoc = await membersv.save(_member);

    const roomCollection = firebaseAdmin.firestore().collection("rooms");

    project.members.map((member) => {
      if (member.userId !== memberDoc.id) {
        roomCollection.add({
          ProjectId: projectId.toString(),
          CreatedAt: memberDoc.createdAt,
          Members: [member.userId.toString(), memberDoc.id.toString()],
        });
      }
    });

    return res.status(200).json(memberDoc);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const memberController = {
  members,
  updateMember,
  deleteMember,
  saveMember,
  sendInvitation,
};
