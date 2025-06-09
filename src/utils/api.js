/**
 * API Configuration
 * This file contains the base URL and endpoints for the API
 */

export const API_BASE_URL = 'http://localhost:3000';

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
