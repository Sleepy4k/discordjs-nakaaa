/**
 * Module dependencies.
 */
import api from "./api.js";
import web from "./web.js";
import { Router } from "express";

/*
 * Initialize router.
 */
const router = Router();

/* Web Route. */
router.use("/", web);

/* Api Route. */
router.use("/api/", api);

export default router;

// Path: dashboard\routes\index.js
