const http = require("http");
const url = require("url");

http
  .createServer((request, response) => {
    const parsedUrl = url.parse(request.url);

    if (parsedUrl.pathname.includes("documentation")) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Documentation Page</h1>");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Index Page</h1>");
    }

    const logMessage = `${new Date().toISOString()} - ${request.url}\n`;
    fs.appendFile("log.txt", logMessage, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      }
    });
  })
  .listen(8080);

console.log("My first Node test server is running on Port 8080.");
