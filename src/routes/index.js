const { Router } = require('express');
const router = Router();

const { getUsers, createUsers } = require('../controllers/index.controller')

router.get('/users', getUsers);
router.post('/users', createUsers);

module.exports = router;