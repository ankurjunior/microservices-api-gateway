/*
 * Created on Sun Jan 18 2026 19:15:08
 * File name : auth.middleware.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : To Check weather the upcoming request is Authenticated or not
 * 2026 Ankur Gangwar
 */

import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const authenticate = (req:Request, res:Response, next:NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[0];

    if(!token){
        return res.status(401).json({
            "message": "Unauthorized"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY!);
        (req as any).user = decoded;
    }catch(err:any){
        return res.status(400).json({
            "message": "Invalid Token!!"
        });
    }
}