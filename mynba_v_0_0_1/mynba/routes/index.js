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

/*router.post('/submmit', function (req, res) {
  console.log("req.body.team => " + req.body.team);
  console.log("fecIni => " + req.body.fecIni);
  console.log("fecFin => " + req.body.fecFin);
  if(req.body.fecIni < req.body.fecFin) {
    res.redirect('/');
  } else {
    res.writeHead(500);
    res.write('Bad Request');
  }
  res.end()
});*/

router.post('/submmit', function (req, res) {
  if(req.body.fecIni < req.body.fecFin) {
    console.log("req.body.team => " + req.body.team);
    console.log("req.body.origin => " + req.body.origin);
    console.log("req.body.passengers => " + req.body.passengers);
    var string = "HOLA MUNDO";
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(string)
  } else {
    res.writeHead(500);
  }
  res.end()
});

module.exports = router;
