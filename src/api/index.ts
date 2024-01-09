import * as express from 'express';
import Auth from '../common/helper/auth';
const router = express.Router();

const authInstance = new Auth();

module.exports = router;