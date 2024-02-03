import {Router} from 'express'
import { controllers } from '../controllers/products.controllers.js';

const router = Router();

router.get('/products',controllers.getProducts)
router.get('/products/:id',controllers.getProduct)
router.post('/products',controllers.createtProducts)
router.put('/products/:id',controllers.updateProduct)
router.delete('/products/:id',controllers.deleteProduct)

export default router