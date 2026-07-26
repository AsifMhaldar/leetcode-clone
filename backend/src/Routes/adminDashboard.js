const express = require('express');
const adminDashboardRouter = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const { getDashboardStats, getUsers, updateUserRole, deleteUser } = require('../controllers/adminDashboard');

adminDashboardRouter.get('/dashboard', adminMiddleware, getDashboardStats);
adminDashboardRouter.get('/users', adminMiddleware, getUsers);
adminDashboardRouter.put('/users/:userId/role', adminMiddleware, updateUserRole);
adminDashboardRouter.delete('/users/:userId', adminMiddleware, deleteUser);

module.exports = adminDashboardRouter;
