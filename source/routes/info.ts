import express from 'express';
import controller from '../controllers/info';
const router = express.Router();

router.get('/info/:nationalNumber', controller.getNationalNumber);


export default router
