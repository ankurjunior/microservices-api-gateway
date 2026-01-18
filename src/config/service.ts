/*
 * Created on Sun Jan 18 2026 18:59:04
 * File name : service.ts
 * This file is intended for development and maintenance purposes. You are free to edit and modify this file as required.
 * Description : Sun Jan 18 2026 18:59:04
 * 2026 Ankur Gangwar
 */


function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

export const SERVICES = {
  auth: required('AUTH_SERVICE'),
  patient: required('PATIENT_SERVICE'),
};