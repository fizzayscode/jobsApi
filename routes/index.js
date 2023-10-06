const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  editJob,
} = require("../controller/jobs");

const router = express.Router();

router
  .route("/jobs")
  .get(authMiddleware, getAllJobs)
  .post(authMiddleware, createJob);

router.route("/jobs/:id").get(getJob).delete(deleteJob).patch(editJob);

module.exports = router;
