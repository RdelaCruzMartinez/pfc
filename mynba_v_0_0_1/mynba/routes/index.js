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
            body: json
        };

        console.log("before send()");

        request(options).then(function (response) {
            var jsonResponse = JSON.parse(response);
            processData(jsonResponse);
            console.log("200");
            res.writeHead(200, {"Content-Type": "application/json"});
            console.log("end()");
            res.end()
        }).catch(function (err) {
            console.log(err)
        });
    } else {
        res.writeHead(500);
    }
});

function processData(json) {
    var cheapest = json.trips.tripOption[0],
        airlines = json.trips.data.carrier,
        cities = json.trips.data.city;
    console.log("airlines = " + JSON.stringify(airlines));
    for (var i = 0; i < json.trips.tripOption.length; i++) {
        if (cheapest.saleTotal > json.trips.tripOption[i].saleTotal) {
            cheapest = json.trips.tripOption[i];
        }
    }
    fs.writeFile("cheapestBefore.json", JSON.stringify(cheapest));

    console.log("slice length = " + cheapest.slice.length);

    for (var ii = 0; ii < cheapest.slice.length; ii++) {
        console.log("slice: " + ii);
        for (var iii = 0; iii < cheapest.slice[ii].segment.length; iii++) {
            console.log("segment: " + iii);
            for (var y = 0; y < airlines.length; y++){
                console.log("compara: " + cheapest.slice[ii].segment[iii].flight.carrier + " === " + airlines[y].code);
                if (cheapest.slice[ii].segment[iii].flight.carrier === airlines[y].code) {
                    console.log("TRUE");
                    cheapest.slice[ii].segment[iii].flight.carrier = airlines[y].name
                }
            }
        }
    }

    fs.writeFile("cheapestAfter.json", JSON.stringify(cheapest));


}

module.exports = router;
