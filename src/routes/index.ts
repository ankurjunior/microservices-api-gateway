/*
 * Created on Sun Jan 18 2026 19:50:39
 * File name : index.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sun Jan 18 2026 19:50:39
 * 2026 Ankur Gangwar
 */

import { Router } from 'express';
import patientRoutes from './patient.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/patients', patientRoutes);
router.use('/auth', authRoutes);

export default router;
