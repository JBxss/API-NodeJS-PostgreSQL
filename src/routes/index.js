const { Router } = require('express');
const router = Router();

const { getUsers, getUsersByID, createUsers, updateUsers, deleteUsers } = require('../controllers/index.controller');
const { registerUsers, loginUsers, profileUsers} = require('../controllers/auth.controller');
const verifyToken = require("../controllers/verifyToken");

// Auth
router.post('/register', registerUsers);
router.post('/login', loginUsers);
router.get('/me', verifyToken, profileUsers);

// Users
router.get('/users', getUsers);
router.get('/users/:id', getUsersByID);
router.post('/users', createUsers);
router.delete('/users/:id', deleteUsers);
router.put('/users/:id', updateUsers);

module.exports = router;