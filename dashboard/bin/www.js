/**
 * Module dependencies.
 */
import http from "http";
import debugLib from "debug";
import app from "../express.js";

/**
 * Create server
 * @param {object} client
 * @returns {void}
 */
export default function createServer(client) {
  /**
   * Setup debug
   */
  const name = slugify(client.config.options.name);
  const debug = debugLib(`${name}:server`);

  /**
   * Set client to express app
   */
  app.set("client", client);

  /**
   * Get port from environment and store in Express.
   */
  const port = normalizePort(client.config.web.port || "3000");
  app.set("port", port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  /**
   * Make slug from string
   * @param {string} str
   * @returns {string}
   */
  function slugify(str) {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  /**
   * Normalize a port into a number, string, or false.
   *
   * @param {string} val
   * @returns {number|string|boolean}
   */
  function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   *
   * @param {Error} error
   * @returns {void}
   */
  function onError(error) {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   *
   * @returns {void}
   */
  function onListening() {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

    debug("Listening on " + bind);
  }

  return server;
}

// Path: dashboard\bin\www.js
