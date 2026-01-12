const express = require('express');

const problemRouter = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblem,
  getAllProblemAdmin, // Make sure this is imported
  solvedAllProblembyUser,
  submittedProblem
} = require('../controllers/userProblem');
const userMiddleware = require('../middleware/userMiddleware')

problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.put("/update/:id", adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem);

problemRouter.get("/problemById/:id", userMiddleware, getProblemById);
problemRouter.get("/getAllProblem", userMiddleware, getAllProblem);
problemRouter.get("/getAllProblemAdmin", adminMiddleware, getAllProblemAdmin); // This should work now
problemRouter.get("/problemSolvedByUser", userMiddleware, solvedAllProblembyUser);
problemRouter.get("/submittedProblem/:pid", userMiddleware, submittedProblem);
// problemRouter.get("/problemSolvedByUser", userMiddleware, problemSolvedByUser);

module.exports = problemRouter;