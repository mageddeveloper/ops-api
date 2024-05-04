import express from 'express';
import verifyToken from '@middlewares/auth.js';
import { validate } from "@requests/validation.js";
import verifyApiKey from '@middlewares/verifyApiKey.js';
import { orderRequest } from '@requests/order/orderRequest.js';
import * as orderController from '@controllers/orderController.js';
import { orderListRequest } from '@requests/order/orderListRequest.js';
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const router = express.Router();


router.post('/list', ClerkExpressRequireAuth(), validate(orderListRequest), orderController.listAppOrders);
router.post('/create', verifyApiKey, validate(orderRequest), orderController.createOrder);

export default router;
