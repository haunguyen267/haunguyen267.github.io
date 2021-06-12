import express from 'express';
import * as controller from '../controllers/cart.controller.js';
const router = express.Router();

router.get('/add/:productId', controller.addToCart);

export default router;
