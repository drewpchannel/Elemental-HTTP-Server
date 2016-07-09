const http = require ('http');
const fs = require ('fs');

const server = http.createServer((req, res) => {
  console.log('Server created...');
  res.writeHead(200);
  directReq(req, res);
});

server.listen(8080, () => {
  console.log('Server listening...');
});

function directReq (req, res) {
  if (req.method === 'GET') {
    console.log(fs.readFile('./public/hydrogen.html'));
  }
}