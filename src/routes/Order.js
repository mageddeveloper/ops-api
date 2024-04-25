import express from 'express';
import verifyToken from '@middlewares/auth.js';
import { validate } from "@requests/validation.js";
import verifyApiKey from '@middlewares/verifyApiKey.js';
import { orderRequest } from '@requests/order/orderRequest.js';
import * as orderController from '@controllers/orderController.js';

const router = express.Router();


router.get('/', verifyToken, orderController.listAppOrders);
router.post('/', validate(orderRequest), verifyApiKey, orderController.listAppOrders);

export default router;
