module.exports =  {
    findFligthsProcess: function (req) {
        console.log("req.body.team => " + req.body.team);
        console.log("req.body.origin => " + req.body.origin);
        console.log("req.body.passengers => " + req.body.passengers);
        console.log("req.body.fecIni => " + req.body.fecIni);
        console.log("req.body.fecFin => " + req.body.fecFin);
        var json = this.buildRequest(req);
        console.log("build request json = " + json);
        return json;
        //this.makeRequest(json);
    },
    buildRequest: function (req) {
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
                solutions: 2
            }
        };
        return JSON.stringify(postRequest);
    }
};
