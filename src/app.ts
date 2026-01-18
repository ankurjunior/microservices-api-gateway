/*
 * Created on Sun Jan 18 2026 19:00:24
 * File name : app.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sun Jan 18 2026 19:00:24
 * 2026 Ankur Gangwar
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes';
import { correlation } from './middlewares/correlation.middleware';
import { connnections } from "./infra/index";
import {securityGuards}   from './security';
import securityMiddleware from "./middlewares/security.middleware";
import deviceHeaderCheck from "./middlewares/deviceheadercheck.middleware";

const app = express(); 

async function bootstrap() {
    const { redis }              = await connnections();
    const {rateLimiter, iPGuard} = await securityGuards(redis); 
    const secure                 = securityMiddleware({rateLimiter, iPGuard} );  

    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(correlation);// 1. Correlation & logging
    app.use(secure); //2. Network-level guards -> First IP check then Rate Limiter
    app.use(deviceHeaderCheck);// 3. Client identity
    app.use('/api', router);
}

bootstrap().catch((err) => {
  console.error("Bootstrap failed:", err);
  process.exit(1);
});

export default app;
