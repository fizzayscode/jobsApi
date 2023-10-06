const { customBadRequestError } = require("../errors");
const Jobs = require("../models/jobs");

const getAllJobs = async (req, res) => {
  try {
    const alljobs = await Jobs.findAll({
      where: { createdBy: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json({ msg: "user found", userId: req.user.id, jobs: alljobs });
  } catch {
    throw new customBadRequestError("cant find all the jobs");
  }
};

const createJob = async (req, res) => {
  const { company, position, status } = req.body;

  if (!company || !position) {
    throw new customBadRequestError(" provide all the fields bro");
  }
  const { id } = req.user;
  // res.json({ user: req.user, body: req.body });
  try {
    const job = await Jobs.create({
      ...req.body,
      createdBy: id,
    });
    res.status(200).json({ job: job, createdby: id });
  } catch (error) {
    throw new customBadRequestError("an error creating your job");
  }
};

const getJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;
  console.log(jobId);

  try {
    const pJob = await Jobs.findOne({
      where: { id: jobId, createdBy: userId },
    });
    res.send({ status: "found", jobs: pJob });
  } catch {
    throw new customBadRequestError("an error fetching this particlar job");
  }
};
const editJob = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const pJob = await Jobs.findOne({
      where: { id: id, createdBy: userId },
    });
    pJob.company = req.body.company ? req.body.company : pJob.company;
    pJob.position = req.body.position ? req.body.position : pJob.position;
    pJob.status = req.body.status ? req.body.status : pJob.status;
    const newJob = await pJob.save();
    res.status(200).json({ status: "found", jobs: newJob });
  } catch {
    throw new customBadRequestError("cant edit job due to some reasons");
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const pJob = await Jobs.findOne({
    where: { id: id, createdBy: userId },
  });
  if (!pJob) {
    throw new customBadRequestError("no job with this id found to delete");
  }
  await pJob.destroy();
  res.status(200).json({ task: pJob, deleted: "true" });
  try {
  } catch {
    throw new customBadRequestError("cant delete this job");
  }
};

module.exports = { deleteJob, createJob, editJob, getAllJobs, getJob };
