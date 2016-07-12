const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
var temPlate = require('./temPlate');
var numOfElements = 2;

const server = http.createServer((req, res) =>  {
  if (req.url === '/') {
    req.url = '/index.html';
  }
  if(req.method === 'GET'){
    getFunction(req, res);
  } else if(req.method === 'POST' && pswdCheck(req, res)){
    postFunction(req, res);
  } else if (req.method === 'DELETE' && pswdCheck(req, res)) {
    deletePost(req, res);
  } else if (req.method === 'PUT' && pswdCheck(req, res)) {
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
    res.end();
  });
};
function addNewElem(req, reqBody) {
  fs.readFile('./public' + req.url, (err, data) => {
    if(err !== null) {
      numOfElements++;
      var tempIndex = temPlate();
      tempIndex = tempIndex.replace (/<!-- zzzzzzz -->/g, numOfElements);
      tempIndex = tempIndex.replace (/<!-- qqqqqq -->/g, `\r\n    <li>\r\n      <a href="${req.url}">${reqBody.elementName}</a>\r\n    </li>\r\n    <!-- qqqqqq -->`);
      fs.writeFileSync('public/index.html', tempIndex);
      var tempTemplate = fs.readFileSync('./temPlate.js');
      tempTemplate = tempTemplate.toString().replace (/<!-- qqqqqq -->/g, `\r\n    <li>\r\n      <a href="${req.url}">${reqBody.elementName}</a>\r\n    </li>\r\n    <!-- qqqqqq -->`);
      fs.writeFileSync('./temPlate.js', tempTemplate);
    }
  });
}
function deletePost(req, res) {
  var x = fs.readFileSync('public/index.html').toString();
  var z = x.slice(x.search('<a href=\"' + req.url) + (req.url.length * 2) + 21, x.length);
  var y = x.slice(0, x.search('<a href=\"' + req.url) - 12);
  x = y + z;
  fs.writeFileSync('public/index.html', x);
  fs.unlinkSync('./public' + req.url);
  numOfElements--;
  res.end();
}
function pswdCheck(req, res) {
  if (req.headers.pswd === 'abc123') {
    console.log('accepted');
    return true;
  } else {
    console.log('denied');
    res.end();
  }
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