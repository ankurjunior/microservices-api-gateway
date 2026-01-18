/*
 * Created on Sun Jan 18 2026 19:03:35
 * File name : server.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sun Jan 18 2026 19:03:35
 * 2026 Ankur Gangwar
 */
import dotenv from 'dotenv';
dotenv.config();

import log from "./utils/log";
import app from "./app";

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{
    log.success(`API Gateway Running on PORT ${PORT}`);
});