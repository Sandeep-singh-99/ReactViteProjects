import express from "express";
import {
  approveRequest,
  createGroup,
  getGroup,
  groupDelete,
  joinGroup,
  joinGroupByInviteLink,
  removeMember,
  uploadGroupImage,
  uploadMiddleware,
} from "../controller/group.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/create-group").post(protectedRoute, createGroup);

router.route("/upload-group-image").post(protectedRoute, uploadMiddleware, uploadGroupImage)

router.route("/join-group/:groupId").post(protectedRoute, joinGroup);

router.route("/approve/:groupId/:userId").post(protectedRoute, approveRequest);

router.route("/remove/:groupId/:userId").delete(protectedRoute, removeMember);

router.route("/delete/:groupId").delete(protectedRoute, groupDelete);

router.route("/join/:inviteLink").get(protectedRoute, joinGroupByInviteLink);

router.route("/get-all-groups").get(protectedRoute, getGroup);

export default router;
