/*
 * Created on Sun Jan 18 2026 19:10:31
 * File name : correlation.middleware.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Setting Correlation ID in Request and same in Resopnse headers
 * 2026 Ankur Gangwar
 */

import { Request, Response, NextFunction } from "express";
import { v4 as UUID } from 'uuid';


export const correlation = ( req: Request, res: Response, next: NextFunction)=>{
    req.headers['x-correlation-id'] ||= UUID();
    res.setHeader('x-correlation-id', req.headers['x-correlation-id']);
    next();
}