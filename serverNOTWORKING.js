const http = require ('http');
const fs = require ('fs');

const server = http.createServer((req, res) => {
  req.on('data', (data) => {
    console.log(data.toString());
  });
});

server.listen(8080, () => {
  console.log('Server listening...');
});

function directReq (req, res) {
  var x = req.method;
  if (x === 'GET') {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(fs.readFileSync('./public/hydrogen.html'));
    res.writeHead(200, {"Content-Type": "text/css"});
    res.write(fs.readFileSync('./public/css/styles.css'));
    res.end();
  }
}