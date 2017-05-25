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
    console.log("airlines = " + JSON.stringify(cities));
    for(var i = 0; i < json.trips.tripOption.length; i++) {
        if(cheapest.saleTotal > json.trips.tripOption[i].saleTotal) {
            cheapest = json.trips.tripOption[i];
        }
    }
    fs.writeFile("cheapest.json", JSON.stringify(cheapest));

/*    var escalas;
    for(var ii = 0; ii < cheapest.slice.length; ii++) {
        for( var iii = 0; iii < cheapest.slice[ii].segment.length; iii++) {
            for( var iiii = 0; iiii < airlines.length; iiii++) {
                if (cheapest.slice[ii].segment[iii].flight.carrier === airlines.code) {
                    cheapest.slice[ii].segment[iii].flight.carrie = airlines.name;
                }
            }
        }
    }

    fs.writeFile("NEWcheapest.json", JSON.stringify(cheapest));*/

/*    var processedJson = {
        price: cheapest.saleTotal,
        departureScales: []
    }*/
}

module.exports = router;
