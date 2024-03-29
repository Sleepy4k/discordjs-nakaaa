/**
 * Module dependencies.
 */
import http from "http";
import debugLib from "debug";
import print from "#utils/print.js";
import app from "#dashboard/express.js";

/**
 * Create server
 *
 * @param {object} client
 *
 * @returns {void}
 */
export default function createServer(client) {
  /**
   * Setup debug
   */
  const name = slugify(client.config.bot.name);
  const debug = debugLib(`${name}:server`);

  /**
   * Set client to express app
   */
  app.set("client", client);

  /**
   * Get hostname from environment and store in Express.
   */
  const hostname = client.config.web.hostname || "localhost";
  app.set("hostname", hostname);

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
  server.listen(port, hostname);
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

    if (isNaN(port)) return val;
    if (port >= 0) return port;

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   *
   * @param {Error} error
   * @returns {void}
   */
  function onError(error) {
    if (error.syscall !== "listen") throw error;

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch (error.code) {
      case "EACCES":
        print(bind + " requires elevated privileges", "error");
        process.exit(1);
        break;
      case "EADDRINUSE":
        print(bind + " is already in use", "error");
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
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

    debug("Listening on " + bind);
    print(`Dashboard is running on ${addr.address}:${addr.port}`, "info");
  }

  return server;
}

// Path: dashboard\bin\www.js
