const express = require("express");
const router = express.Router();
const { addBlog, getBlog, updateBlog, deleteBlog, getAllBlog } = require("../controller/blog-controller");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/add-blog").post(authMiddleware ,addBlog)

router.route("/get-blog").get(getBlog)

router.route("/get-all-blog").get(getAllBlog)

router.route("/update-blog/:id").put(authMiddleware, updateBlog)

router.route("/delete-blog/:id").delete(authMiddleware, deleteBlog)


module.exports = router