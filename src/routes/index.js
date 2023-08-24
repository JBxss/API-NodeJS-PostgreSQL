const { Router } = require('express');
const router = Router();

const { getMaterial, getMaterialByID, createMaterial, updateMaterial, deleteMaterial } = require('../controllers/material.controller');
const { getCollection, getCollectionByID, createCollection, updateCollection, deleteCollection } = require('../controllers/collection.controller');
const { registerUsers, loginUsers, profileUsers} = require('../controllers/auth.controller');
const verifyToken = require("../controllers/verifyToken");

// Auth
router.post('/register', registerUsers);
router.post('/login', loginUsers);
router.get('/me', verifyToken, profileUsers);

// Materials
router.get('/materials', verifyToken, getMaterial);
router.get('/materials/:id', verifyToken, getMaterialByID);
router.post('/materials', verifyToken, createMaterial);
router.delete('/materials/:id', verifyToken, deleteMaterial);
router.put('/materials/:id', verifyToken, updateMaterial);

// Collections
router.get('/collections', verifyToken, getCollection);
router.get('/collections/:id', verifyToken, getCollectionByID);
router.post('/collections', verifyToken, createCollection);
router.delete('/collections/:id', verifyToken, deleteCollection);
router.put('/collections/:id', verifyToken, updateCollection);

module.exports = router;