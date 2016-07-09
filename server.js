const http = require ('http');
const fs = require ('fs');

const server = http.createServer((req, res) => {
  server.on('data', (data) => {console.log(data.toString())});
  res.writeHead(200);
  res.end('<h1> is this working? </h1>');
});

server.listen(8080);
