const http = require("http");
const url = require("url");
const fs = require('fs');

http
  .createServer((request, response) => {
    const parsedUrl = url.parse(request.url);

    if (parsedUrl.pathname.includes("documentation")) {
      fs.readFile(__dirname + '/documentation.html', (err, data) => {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Internal Server Error');
        } else {
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(data);
        }
      });
    } else {
      fs.readFile(__dirname + '/index.html', (err, data) => {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Internal Server Error');
        } else {
          response.writeHead(200, { 'Content-Type': 'text/html' });
          response.end(data);
        }
      });
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