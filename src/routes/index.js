const { Router } = require('express');
const router = Router();

const { getUsers, getUsersByID, createUsers, deleteUsers } = require('../controllers/index.controller')

router.get('/users', getUsers);
router.get('/users/:id', getUsersByID);
router.post('/users', createUsers);
router.delete('/users/:id', deleteUsers);

module.exports = router;