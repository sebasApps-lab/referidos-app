const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve("apps/prelaunch/dist");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webmanifest": "application/manifest+json",
  ".map": "application/json; charset=utf-8",
};

function sendFile(res, file) {
  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, { "Content-Type": mime[ext] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}

http
  .createServer((req, res) => {
    const pathname = decodeURIComponent((req.url || "/").split("?")[0]);
    const clean = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    let target = path.resolve(root, clean);

    if (!target.startsWith(root)) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }

    fs.stat(target, (err, stat) => {
      if (!err && stat.isDirectory()) {
        target = path.join(target, "index.html");
      }

      fs.access(target, fs.constants.F_OK, (fileErr) => {
        if (fileErr) {
          sendFile(res, path.join(root, "index.html"));
          return;
        }
        sendFile(res, target);
      });
    });
  })
  .listen(4175, "127.0.0.1");
