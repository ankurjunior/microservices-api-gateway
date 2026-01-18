/*
 * Created on Sun Jan 18 2026 19:24:32
 * File name : proxy.service.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sun Jan 18 2026 19:24:32
 * 2026 Ankur Gangwar
 */

import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export const proxyRequest = async (req: Request, res: Response, next: NextFunction, target: string) => {
    try {
        console.log(`${target}${req.originalUrl.replace('/api', '')}`)
        const response = await axios({
            method : req.method,
            url : `${target}${req.originalUrl.replace('/api', '')}`,
            data: req.body,
            headers :{
                authorization: req.headers.authorization,
                'x-correlation-id': req.headers['x-correlation-id'],
                'x-device-id'     : (req as any).device?.id,
                'x-device-type'   : (req as any).device?.type,
                'x-client-app'    : (req as any).device?.app,
                'x-client-version': (req as any).device?.version,
                host              : undefined
            }
        })

        res.status(response.status).json(response.data);

    } catch (err: any) {
        res.status(err.response?.status || 500).json({
            message: err.message
        })
    }
}