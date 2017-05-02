new Vue({
    el: '#app',
    data: {
        conference: '',
        imgURI: '',
        westTeams: [
            {name:'Golden State Warriors', abbreviation: 'GSW', logo: './images/teams/west/warriors.png'},
            {name:'Los Angeles Lakers', abbreviation: 'LAL', logo: './images/teams/west/lakers.png'},
            {name:'Oklahoma City Thunder', abbreviation: 'OKC', logo: './images/teams/west/okc.png'},
            {name:'San Antonio Spurs', abbreviation: 'SAS', logo: './images/teams/west/spurs.png'},
            {name:'Los Angeles Clippers', abbreviation: 'LAC', logo: './images/teams/west/clipers.png'},
            {name:'Houston Rockets', abbreviation: 'HOU', logo: './images/teams/west/rokets.png'},
            {name:'Portland Trail Blazers', abbreviation: 'POR', logo: './images/teams/west/portland.png'},
            {name:'Dallas Mavericks', abbreviation: 'DAL', logo: './images/teams/west/dallas.png'},
            {name:'Memphis Grizzlies', abbreviation: 'MEM', logo: './images/teams/west/menphis.png'},
            {name:'Utah Jazz', abbreviation: 'UTA', logo: './images/teams/west/jazz.png'},
            {name:'New Orleans Pelicans', abbreviation: 'NOP', logo: './images/teams/west/pelicans.png'},
            {name:'Phoenix Suns', abbreviation: 'PHX', logo: './images/teams/west/suns.png'},
            {name:'Minnesota Timberwolves', abbreviation: 'MIN', logo: './images/teams/west/minesota.png'},
            {name:'Sacramento Kings', abbreviation: 'SAC', logo: './images/teams/west/kings.png'},
            {name:'Denver Nuggets', abbreviation: 'DEN', logo: './images/teams/west/nuggets.png'}
        ],
        eastTeams: [
            {name:'Cleveland Cavaliers', abbreviation: 'CLE', logo: './images/teams/east/cavs.png'},
            {name:'Chicago Bulls', abbreviation: 'CHI', logo: './images/teams/east/bulls.png'},
            {name:'Miami Heat', abbreviation: 'MIA', logo: './images/teams/east/miami.png'},
            {name:'New York Knicks', abbreviation: 'NYK', logo: './images/teams/east/nicks_250x248.png'},
            {name:'Boston Celtics', abbreviation: 'BOS', logo: './images/teams/east/celtics.png'},
            {name:'Toronto Raptors', abbreviation: 'TOR', logo: './images/teams/east/raptors.png'},
            {name:'Atlanta Hawks', abbreviation: 'ATL', logo: './images/teams/east/atlanta.png'},
            {name:'Indiana Pacers', abbreviation: 'IND', logo: './images/teams/east/indiana.png'},
            {name:'Brooklyn Nets', abbreviation: 'BKN', logo: './images/teams/east/brooklyn.png'},
            {name:'Philadelphia 76ers', abbreviation: 'PHI', logo: './images/teams/east/phila.png'},
            {name:'Detroit Pistons', abbreviation: 'DET', logo: './images/teams/east/pistons.png'},
            {name:'Washington Wizards', abbreviation: 'WAS', logo: './images/teams/east/wizards.png'},
            {name:'Milwaukee Bucks', abbreviation: 'MIL', logo: './images/teams/east/milwaukee.png'},
            {name:'Charlotte Hornets', abbreviation: 'CHA', logo: './images/teams/east/hornets.png'},
            {name:'Orlando Magic', abbreviation: 'ORL', logo: './images/teams/east/orlando.png'}
        ]
    },
    methods: {
        updateImage(data){
            console.log(data);
        },
        conferencePicker(){

        }

    },
});