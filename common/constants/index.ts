/**
 * Application Constants
 * Central location for all app-wide constants
 */

// API Endpoints
export const API_ENDPOINTS = {
  TOTAL: {
    GET: () => `/transfer-totals`,
  },
  RECORDS: {
    LIST: "/transfer-records",
    REPORTS: "/transfer-records/reports",
    CREATE: "/transfer-records",
  },
  FEES: {
    LIST: "/transfer-fees",
    CREATE: "/transfer-fees/many",
    GET: (amount: number) => `/transfer-fees/amount/${amount}`,
  },
  BRANCHES: {
    LIST: () => `/branches`,
  },
} as const;

// Route Paths
export const ROUTES = {
  HOME: "/retail",
  REGISTER: "/register",
  ADD_RECORD: "/transfer-records/add",
  VIEW_RECORDS: "/transfer-records/view",
  ADD_FEE: "/transfer-fees/add",
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: "Retail Management System",
  SHORT_NAME: "RMS",
  DESCRIPTION: "Comprehensive retail management solution",
  VERSION: "1.0.0",
} as const;
