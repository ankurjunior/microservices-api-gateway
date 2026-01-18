/*
 * Created on Sun Jan 18 2026 19:42:34
 * File name : patient.routes.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : All routes related to patient service only
 * 2026 Ankur Gangwar
 */

import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { proxyRequest } from "../proxy/proxy.service";
import { SERVICES } from "../config/service";
import log from "../utils/log";

const router = Router();

// router.use(authenticate); 
router.use((req, res, next) => {    
  proxyRequest(req, res, next, SERVICES.patient as string);
})


export default router;