import * as express from 'express';
import Auth from '../common/helper/auth';
import { userControllers } from './controllers/userControllers';
import { businessPartnerController } from './controllers/partnerController';
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

module.exports = router;