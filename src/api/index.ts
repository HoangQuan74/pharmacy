import * as express from 'express';
import Auth from '../common/helper/auth';
import { userControllers } from './controllers/userControllers';
import { businessPartnerController } from './controllers/partnerController';
import { productController } from './controllers/productControllers';
import { orderController } from './controllers/orderControllers';
const router = express.Router();

const authInstance = new Auth();

// users
router.post('/users/login', userControllers.login);
router.get('/users/profile', authInstance.auth, userControllers.getProfile);
router.get('/users', authInstance.auth, userControllers.users);
router.post('/users', authInstance.auth, userControllers.saveUser);
router.delete('/users/:id', authInstance.auth, userControllers.deleteUser);
router.put('/users/:id', authInstance.auth, userControllers.updateUser);

// partner
router.get('/partner', authInstance.auth, businessPartnerController.businessPartners);
router.post('/partner', authInstance.auth, businessPartnerController.saveBusinessPartner);
router.delete('/partner/:id', authInstance.auth, businessPartnerController.deleteBusinessPartner);
// router.put('/partner/:id', authInstance.auth, businessPartnerController.updateBusinessPartner);

// product category
router.get('/category', productController.productCategories);

// product
router.get('/product', productController.products);
router.post('/product', authInstance.auth, productController.saveProduct);
router.delete('/product/:id', authInstance.auth, productController.deleteProduct);


// order
router.get('/order-sell', authInstance.auth, orderController.orderSelles);
router.get('/order-buy', authInstance.auth, orderController.orderBuys);

router.post('/order-sell', authInstance.auth, orderController.saveOrderSell);
router.post('/order-buy', authInstance.auth, orderController.saveOrderBuy);

router.delete('/order/:id', authInstance.auth, orderController.deleteOrder);

module.exports = router;