var express = require('express');
var fs = require('fs'); //modulo de node para importar archivos.
var flightEngine = require('../controllers/flights/google_qpx_client');
var router = express.Router();
const request = require('request-promise');

/* GET home page. */
router.get('/', function (request, response, next) {
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


router.post('/submmit', function (req, res) {
    console.log("entra");
    if (req.body.fecIni < req.body.fecFin) {
        var json = flightEngine.findFligthsProcess(req);
        const options = {
            method: 'POST',
            uri: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyB8XzJEsYeoVXNzTcc4-IUz9rHAkNrtX9s",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        };

        console.log("before send()");

        request(options).then(function (response) {
            console.log("process data");
            processData(response);
            console.log("200");
            res.writeHead(200, {"Content-Type": "application/json"});
            console.log("end()");
            res.end(response)
        }).catch(function (err) {
            console.log(err)
        });
    } else {
        res.writeHead(500);
    }
});

function processData(json) {
    console.log("entra a proces Data");
    //console.log(json.trips.tripOption);
}

module.exports = router;
