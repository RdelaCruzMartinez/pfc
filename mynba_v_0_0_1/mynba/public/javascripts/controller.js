new Vue({
    el: '#app',
    data: {
        conference: '',
        team: '',
        origin: '',
        passengers: '',
        requestedFlight: false,
        ok: false,
        totalDepartureStopOvers: 0,
        totalArrivalStopOvers: 0,
        flightInformation: {},
        westTeams: [
            {name: 'Golden State Warriors', iata: 'SFO', logo: './images/teams/west/warriors.png'},
            {name: 'Los Angeles Lakers', iata: 'LAX', logo: './images/teams/west/lakers.png'},
            {name: 'Oklahoma City Thunder', iata: 'OKC', logo: './images/teams/west/okc.png'},
            {name: 'San Antonio Spurs', iata: 'SAT', logo: './images/teams/west/spurs.png'},
            {name: 'Los Angeles Clippers', iata: 'LAX', logo: './images/teams/west/clipers.png'},
            {name: 'Houston Rockets', iata: 'IAH', logo: './images/teams/west/rockets.png'},
            {name: 'Portland Trail Blazers', iata: 'PDX', logo: './images/teams/west/portland.png'},
            {name: 'Dallas Mavericks', iata: 'DFW', logo: './images/teams/west/dallas.png'},
            {name: 'Memphis Grizzlies', iata: 'MEM', logo: './images/teams/west/menphis.png'},
            {name: 'Utah Jazz', iata: 'SLC', logo: './images/teams/west/jazz.png'},
            {name: 'New Orleans Pelicans', iata: 'MSY', logo: './images/teams/west/pelicans.png'},
            {name: 'Phoenix Suns', iata: 'PHX', logo: './images/teams/west/suns.png'},
            {name: 'Minnesota Timberwolves', iata: 'MSP', logo: './images/teams/west/minesota.png'},
            {name: 'Sacramento Kings', iata: 'SMF', logo: './images/teams/west/kings.png'},
            {name: 'Denver Nuggets', iata: 'DEN', logo: './images/teams/west/nuggets.png'}
        ],
        eastTeams: [
            {name: 'Cleveland Cavaliers', iata: 'CLE', logo: './images/teams/east/cavs.png'},
            {name: 'Chicago Bulls', iata: 'ORD', logo: './images/teams/east/bulls.png'},
            {name: 'Miami Heat', iata: 'MIA', logo: './images/teams/east/miami.png'},
            {name: 'New York Knicks', iata: 'JFK', logo: './images/teams/east/nicks_250x248.png'},
            {name: 'Boston Celtics', iata: 'BOS', logo: './images/teams/east/celtics.png'},
            {name: 'Toronto Raptors', iata: 'YYZ', logo: './images/teams/east/raptors.png'},
            {name: 'Atlanta Hawks', iata: 'ATL', logo: './images/teams/east/atlanta.png'},
            {name: 'Indiana Pacers', iata: 'IND', logo: './images/teams/east/indiana.png'},
            {name: 'Brooklyn Nets', iata: 'JFK', logo: './images/teams/east/brooklyn.png'},
            {name: 'Philadelphia 76ers', iata: 'PHL', logo: './images/teams/east/phila.png'},
            {name: 'Detroit Pistons', iata: 'DTW', logo: './images/teams/east/pistons.png'},
            {name: 'Washington Wizards', iata: 'IAD', logo: './images/teams/east/wizards.png'},
            {name: 'Milwaukee Bucks', iata: 'MKE', logo: './images/teams/east/milwaukee.png'},
            {name: 'Charlotte Hornets', iata: 'CLT', logo: './images/teams/east/hornets.png'},
            {name: 'Orlando Magic', iata: 'MCO', logo: './images/teams/east/orlando.png'}
        ]
    },
    methods: {
        updateImage: function (zone) {
            var select = document.getElementById(zone);
            var value = select.options[select.selectedIndex].value;
            if (zone == "eastTeams") {
                for (var i = 0; i < this.eastTeams.length; i++) {
                    if (this.eastTeams[i].iata == value) {
                        var imgEast = document.getElementById("eastLogo");
                        imgEast.setAttribute("src", " ");
                        imgEast.setAttribute("src", this.eastTeams[i].logo);
                        break;
                    }
                }
            } else if (zone == "westTeams") {
                for (var ii = 0; ii < this.westTeams.length; ii++) {
                    if (this.westTeams[ii].iata == value) {
                        var imgWest = document.getElementById("westLogo");
                        imgWest.setAttribute("src", " ");
                        imgWest.setAttribute("src", this.westTeams[ii].logo);
                        break;
                    }
                }
            }

        },
        clear: function () {
            var img = document.getElementsByName("teamLogo");
            img[0].setAttribute("src", "");
        },
        submitForm: function () {
            var team = this.team,
                origin = this.origin,
                passengers = this.passengers,
                fecIni = $('#fecIni').val(),
                fecFin = $('#fecFin').val();
            console.log("Capturando valores");
            console.log("team = " + team);
            console.log("origin = " + origin);
            console.log("passengers = " + passengers);
            console.log("fecIni = " + fecIni);
            console.log("fecFin = " + fecFin);
            this.requestedFlight = !this.requestedFlight;
            this.$http.post('/submmit', {team: team, origin: origin, passengers: passengers, fecIni: fecIni, fecFin: fecFin})
                .then(function (response) {
                    this.flightInformation = response.body;
                    console.log(JSON.stringify(this.flightInformation));
                    console.log("departureStopOvers.length => " + this.flightInformation.departureStopOvers.length);
                    this.totalDepartureStopOvers = this.flightInformation.departureStopOvers.length - 1;
                    console.log("Valor de departureStopOvers = " + this.totalDepartureStopOvers);

                    this.requestedFlight = !this.requestedFlight;
                });
        },
        test: function () {
            console.log("this.departureStopOvers => " + this.totalDepartureStopOvers);
            this.ok = !this.ok;
        }
    }
});

$(function () {
    $('#datetimepicker1').datetimepicker({
        format: 'YYYY-MM-DD',
        locale: 'es'
    });

    $('#datetimepicker2').datetimepicker({
        useCurrent: false,
        format: 'YYYY-MM-DD',
        locale: 'es'
    });

    $("#datetimepicker1").on("dp.change", function (e) {
        $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
    });

    $("#datetimepicker2").on("dp.change", function (e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
    });

});