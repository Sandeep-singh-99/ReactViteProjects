import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import { deleteGroupMessage, getGroupMessages, sendGroupMessage, uploadMiddleware } from '../controller/groupMessage.controller.js'

const router = express.Router()

router.route('/:groupId').post(protectedRoute,uploadMiddleware, sendGroupMessage)

router.route("/:groupId").get(protectedRoute, getGroupMessages)

router.route("/:messageId").delete(protectedRoute, deleteGroupMessage)

export default router;