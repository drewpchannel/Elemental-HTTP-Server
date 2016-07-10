// if req.url = '/' make it point to index

const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
var elemCount = 2;

const server = http.createServer((req, res) =>  {
  if (req.url === '/') {
    req.url = '/index.html'; // slash b4 index?
  }
 if(req.method === 'GET'){
   getFunction(req, res);
 } else if(req.method === 'POST'){
   postFunction(req, res);
 }
});

server.listen('8080');

const getFunction = (req, res) => {
 fs.readFile('./public' + req.url, (err, data) => {
   if(err !== null){
     res.write(fs.readFileSync('public/404.html'));
     res.end();
   } else {
     res.write(fs.readFileSync('public' + req.url));
     res.end();
   }
 });
};
const postFunction = (req, res) => {
  req.on('data', (data) => {
    const reqBody = querystring.parse(data.toString());
    addNewElem(req, reqBody);
    fs.writeFileSync('public' + req.url, htmlTemplate(reqBody));
/*    fs.readFile('./public' + req.url, (err, data) => {
      console.log(err + "  " + data);
    });*/
    res.end();
  });
};
function addNewElem(req, reqBody) {
  fs.readFile('./public' + req.url, (err, data) => {
    if(err !== null) {
      var x = fs.readFileSync('public/index.html').toString();
      var y = x.slice(0, x.search('</ol>') - 3);
      var z = x.slice(x.search('</ol>') - 3, x.length);
      x = y + `\r\n    <li>\r\n      <a href="${req.url}">${reqBody.elementName}</a>\r\n    </li>` + z;
      fs.writeFileSync('public/index.html', x);
      y = x.slice(0, x.search('<h3>'));
      Objects.keys(reqBody).replace(/'These are ' + elemCount/gi, 'These are ' + (elemCount + 1));
    }
  });
}

const htmlTemplate = (reqBody) => (

  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - ${reqBody.elementName}</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>${reqBody.elementName}</h1>
  <h2>${reqBody.elementSymbol}</h2>
  <h3>Atomic number ${reqBody.elementAtomicNumber}</h3>
  <p>${reqBody.elementDescription}</p>
  <p><a href="/index.html">back</a></p>
</body>
</html>`
);