'use strict';

const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const PORT = process.env.PORT || 3000;
// var PORT = 3000;
// if( process.env.PORT ){
//   PORT = process.env.PORT;
// }

const ELEMENT_TEMPLATE = ``;

function renderTemplate(template, locals){

}

function writeFile(filePath, fileContent){
  fs.writeFile(filePath, fileContent);
  // error handling
}

function send404(res){

}

// read file from public/
// send that file to client
function handleGET(req, res){

  // make index.html the default document


}

/*
 *
 * read in request data
 * parse the data into Object
 * prepare data to be written
 * render a template using that Object
 * save the rendered template
 * send OK message to user
 */
function handlePOST(req, res){


}

const server = http.createServer((req, res) => {
  // someone connected

  switch( req.method ){
    case 'GET':
      handleGET(req, res);

      break;
    case 'POST':
      handlePOST(req, res);

      break;
    default:
      send404(res);
  }


});

server.listen(PORT, ()=> console.log(`server listening on port ${PORT}`));