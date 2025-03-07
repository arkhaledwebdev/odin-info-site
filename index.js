const { createServer } = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const port = 8080;

const server = createServer((req, res) => {
  let filePath = "";

  switch (req.url) {
    case "/":
      filePath = path.join(__dirname, "index.html");
      break;
    case "/about":
      filePath = path.join(__dirname, "about.html");
      break;
    case "/contact-me":
      filePath = path.join(__dirname, "contact-me.html");
      break;
    default:
      filePath = path.join(__dirname, "404.html");
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error: ${err.code}`);
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content, "utf-8");
  });
});

server.listen(port, () => {
  console.log(`Server running at port: ${port}/`);
});
