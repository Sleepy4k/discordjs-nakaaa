import "dotenv/config.js";

export const name = process.env.APP_NAME || "Express JS";
export const env = process.env.APP_ENV || "development";
export const port = process.env.APP_PORT || "3000";
export const url = process.env.APP_URL || "http://localhost:3000";

// Path: dashboard\config\app.config.js
