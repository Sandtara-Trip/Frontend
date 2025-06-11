/**
 * API Configuration
 * This file contains the base URL and endpoints for the API
 */

import { API_BASE_URL } from '../config/api';

export const API_ENDPOINTS = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    validate: '/auth/validate',
    verifyEmail: '/auth/verify-email',
    resendVerification: '/auth/resend-verification',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  }
};

export const getFullUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
