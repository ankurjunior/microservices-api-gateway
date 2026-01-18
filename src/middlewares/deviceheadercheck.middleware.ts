/*
 * Created on Sun Jan 18 2026 23:37:32
 * File name : deviceheadercheck.middleware.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sun Jan 18 2026 23:37:32
 * 2026 Ankur Gangwar
 */


import { Request, Response, NextFunction } from "express";

const ALLOWED_DEVICE_TYPE = ['web', 'android', 'ios'];

const deviceHeaderCheck = (req: Request, res: Response, next: NextFunction) => {
    const deviceId      = req.header("x-device-id");
    const deviceType    = req.header("x-device-type");
    const clientApp     = req.header("x-client-app");
    const clientVersion = req.header("x-client-version");

    /**
     * Step 1 : Device Headers Check
     */
    if (!deviceId || !deviceType || !clientApp || !clientVersion) {
        return res.status(400).json({
            message: "Required Device Headers are Missing"
        })
    }

    /**
     * Check allowe device type
     */
    if (!ALLOWED_DEVICE_TYPE.includes(deviceType.toLocaleLowerCase())) {
        return res.status(400).json({
            message: `Invalid device type ${deviceType}`
        });
    }

    /**
     * Step 3: If all ok. Attach device context to request
     */
    (req as any).device = {
        id     : deviceId,
        type   : deviceType.toLowerCase(),
        app    : clientApp,
        version: clientVersion,
        ip     : req.ip
    }

    next();
}

export default deviceHeaderCheck;