import express from 'express';
import { createUser, deleteUser, getAllUsers, showUser, updateUser } from '../controller/user.controller.js';

const router = express.Router();


router.route("/create-user").post(createUser)

router.route("/update-user/:id").put(updateUser) 

router.route("/get-all-users").get(getAllUsers)

router.route("/show-user/:id").get(showUser)

router.route("/delete-user/:id").delete(deleteUser)

export default router;