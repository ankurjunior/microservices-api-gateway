/*
 * Created on Sat Jan 10 2026 01:03:17
 * File name : security.middleware.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sat Jan 10 2026 01:03:17
 * 2026 Ankur Gangwar
 */
 
import { Request, Response, NextFunction } from "express";

const securityMiddleware = ({ rateLimiter, iPGuard }: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {


      const ip =
        req.ip ??
        (typeof req.headers["x-forwarded-for"] === "string"
          ? req.headers["x-forwarded-for"]
          : "unknown");

      const logger = req.app.locals.logger;
      const route = req.originalUrl;

      /**
       * Step 1
       * Check If IP is blocked or not
       */
      const ipBlocked = await iPGuard.isBlocked(ip);

      //If blocker then return error
      if (ipBlocked) {
        logger.info("IP_BLOCKED", { ip });

        return res.status(403).json({
          message: "Your IP has been temporarily blocked.",
        });
      }

      /**
       * Step 2
       * Check limit on Rout from a IP
       */
      await rateLimiter.check(ip, route);


      /**
       *
       */
      next();
    } catch (err: any) {
      return res.status(429).json({
        message: err.message || "Too many requests",
      });
    }
  };
};

export default securityMiddleware;
