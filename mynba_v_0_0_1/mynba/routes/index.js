var express = require('express');
var fs = require('fs'); //modulo de node para importar archivos.
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response, next){
  response.writeHead(200, {'content-type': 'text/html'});
  fs.readFile('../public/index.html', null, function (error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File not Found');
    } else {
      //si va bien escribimos el archivo html.
      response.write(data);
    }
    response.end();
  });
});

module.exports = router;