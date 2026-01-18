/**
 * File: index.js
 * Author: Ankur Gangwar
 * Created: 2025-12-25
 * Description: This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 */

import "dotenv/config";
import RedisClient from "./redis.config";



export async function connnections() {
  const redis = RedisClient.getInstance(); 
  
  return { 
    redis: redis
  };
}

