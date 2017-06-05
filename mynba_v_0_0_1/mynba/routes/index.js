var express = require('express');
var fs = require('fs'); //modulo de node para importar archivos.
var router = express.Router();
var body = {};
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
    console.log("req.body.team => " + req.body.team);
    console.log("req.body.origin => " + req.body.origin);
    console.log("req.body.passengers => " + req.body.passengers);
    console.log("req.body.fecIni => " + req.body.fecIni);
    console.log("req.body.fecFin => " + req.body.fecFin);
    if (req.body.fecIni < req.body.fecFin) {
        var json = buildJsonRequest(req);

        var options = {
            method: 'POST',
            uri: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyB8XzJEsYeoVXNzTcc4-IUz9rHAkNrtX9s",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        };
        console.log("before send()");

        request(options).then(function (response) {
            response = JSON.parse(response);
           var jsonResponse = processData(response);
           jsonResponse = buildJsonResponse(jsonResponse);
            console.log("200");
            res.writeHead(200, {"Content-Type": "application/json"});
            console.log("end()");
            res.end(JSON.stringify(jsonResponse));
        }).catch(function (err) {
            console.log(err)
        });
    } else {
        res.writeHead(500);
    }
});

function buildJsonRequest (req) {
    var postRequest = {
        request: {
            passengers: {
                adultCount: req.body.passengers
            },
            slice: [{
                origin: req.body.origin,
                destination: req.body.team,
                date: req.body.fecIni
            },
                {
                    origin: req.body.team,
                    destination: req.body.origin,
                    date: req.body.fecFin
                }],
            solutions: 10
        }
    };
    return JSON.stringify(postRequest);
}

function processData(json) {
    var cheapest = json.trips.tripOption[0],
        airlines = json.trips.data.carrier,
        cities = json.trips.data.city;
    for (var i = 0; i < json.trips.tripOption.length; i++) {
        if (cheapest.saleTotal > json.trips.tripOption[i].saleTotal) {
            cheapest = json.trips.tripOption[i];
        }
    }
    fs.writeFile("cheapestBefore.json", JSON.stringify(cheapest));


    for (var j = 0; j < cheapest.slice.length; j++) {
        for (var k = 0; k < cheapest.slice[j].segment.length; k++) {
            for (var y = 0; y < airlines.length; y++){
                if (cheapest.slice[j].segment[k].flight.carrier === airlines[y].code) {
                    cheapest.slice[j].segment[k].flight.carrier = airlines[y].name
                }
            }
            for (var yy = 0; yy < cities.length; yy++) {
                if(cheapest.slice[j].segment[k].leg[0].origin === cities[yy].code) {
                    cheapest.slice[j].segment[k].leg[0].origin = cities[yy].name
                }
                if(cheapest.slice[j].segment[k].leg[0].destination === cities[yy].code) {
                    cheapest.slice[j].segment[k].leg[0].destination = cities[yy].name
                }
            }
        }
    }

    fs.writeFile("cheapestAfter.json", JSON.stringify(cheapest));
    return cheapest;

}

function buildJsonResponse(processedData) {

    var finalJson = {
        totalCost: processedData.saleTotal.slice(3, 50),
        departureStopOvers: [],
        arrivalStopOvers: []
    };


    for (var i = 0; i < processedData.slice[0].segment.length; i++) {
        var departure = {
            origin: processedData.slice[0].segment[i].leg[0].origin,
            destination: processedData.slice[0].segment[i].leg[0].destination,
            airline: processedData.slice[0].segment[i].flight.carrier,
            duration: processedData.slice[0].segment[i].leg[0].duration
        };

        finalJson.departureStopOvers.push(departure);
    }

    for (var j = 0; j < processedData.slice[1].segment.length; j++) {
        var arrival = {
            origin: processedData.slice[1].segment[j].leg[0].origin,
            destination: processedData.slice[1].segment[j].leg[0].destination,
            airline: processedData.slice[1].segment[j].flight.carrier,
            duration: processedData.slice[1].segment[j].leg[0].duration
        };

        finalJson.arrivalStopOvers.push(arrival);
    }

    fs.writeFile("finalJson.json", JSON.stringify(finalJson));
    return finalJson;
}

module.exports = router;
