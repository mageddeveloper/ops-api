import express from 'express';
import listAllUsers from '@controllers/admin/userController.js';
import { authorize } from '@middlewares/authorize.js';

const router = express.Router();

router.get('/users', authorize(['admin']), listAllUsers);

export default router;
