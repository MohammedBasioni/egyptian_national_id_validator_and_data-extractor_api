import express from 'express';
import controller from '../controllers/info';
const router = express.Router();

router.get('/:national_number', controller.getNationalNumber);


export default router
