/**
 * Application constants
 * Export all constant modules from a single entry point
 */

export * from "./routes";

/**
 * Pagination configuration
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  DEFAULT_PAGE: 0,
};

/**
 * API configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_API_URL_V1,
  TIMEOUT: 10000, // 10 seconds
};

/**
 * Application metadata
 */
export const APP_META = {
  NAME: "AgentIQ",
  TAGLINE: "",
  VERSION: "1.0.0",
};
