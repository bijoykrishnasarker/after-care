/* GoDaddy Node.js: bind to process.env.PORT */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false;
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("[AFTERCARE] request error", err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, hostname, () => {
    console.log(`[AFTERCARE] package: after-care`);
    console.log(`[AFTERCARE] listening on http://${hostname}:${port}`);
  });
});
