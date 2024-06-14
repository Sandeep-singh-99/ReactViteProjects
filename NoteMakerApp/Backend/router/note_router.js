const express = require('express')
const router = express.Router()
const noteController = require("../controller/note_controller")

router.route("/").get(noteController.home)

router.route("/getnote").get(noteController.getnote)

router.route("/addnote").post(noteController.addnote)

router.route("/updatenote").put(noteController.updatenote)

router.route("/deletenote").delete(noteController.deletenote)

module.exports = router