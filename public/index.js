
const createLeagueInfo = () => {

const leagueInfo = {

    premier:  {
          leagueName: "Premier League",
          leagueId: 2790
    },
    laLiga: {
          leagueName: "La Liga",
          leagueId: 2833
    },
    bundesliga: {
          leagueName: "Bundesliga",
          leagueId: 2755
    },
    serieA: {
          leagueName: "Seria A",
          leagueId: 2857
    },
    ligue1: {
          leagueName: "Ligue 1",
          leagueId: 2664
    }
  };

  return leagueInfo;
}

const executeChoice = () => {

  const leagues = createLeagueInfo();

  const leagueOptions = document.querySelector(".league-options");

  leagueOptions.addEventListener("click", () => {
    const userOption = event.target.classList;
    switch ( true ) {
      case userOption.contains('premier-btn'):
        callApi(leagues.premier.leagueId, leagues.premier.leagueName);
        break;
      case userOption.contains('liga-btn'):
        callApi(leagues.laLiga.leagueId, leagues.laLiga.leagueName);
        break;
      case userOption.contains('bundesliga-btn'):
        callApi(leagues.bundesliga.leagueId, leagues.bundesliga.leagueName);
        break;
      case userOption.contains('serie-btn'):
        callApi(leagues.serieA.leagueId, leagues.serieA.leagueName);
        break;
      case userOption.contains('ligue-btn'):
        callApi(leagues.ligue1.leagueId, leagues.ligue1.leagueName);
        break;
      default:
        alert("Sorry, this option is not currently available!");
    };
  });
}


//Function that calls the api using the leagues unique ID.
const callApi = (leagueId, leagueName) => {
  fetch("https://api-football-v1.p.rapidapi.com/v2/leagueTable/" + leagueId, {
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  		"x-rapidapi-key": "5d57b8c6f1mshfea26e104664317p170162jsn99bed2e8e7c0"
  	}
  })
  .then(response => response.json() )
  .then(data => {
    let standings = data.api.standings[0];
    console.log(data);
    populateData(standings, leagueName);

  })
  .catch(err => {
  	console.log(err);
  });
}

  //Removes elements to accomodate number of teams from a league. The default number is 20.
const hidePositions = (numOfTeams) => {

  const removablePositions = document.querySelectorAll('.removable');
  console.log(removablePositions);

  if(numOfTeams > 18){
    removablePositions.forEach( (element) => {
      if(element.classList.contains("remove-on")){
        element.classList.remove("remove-on");
      }
    });
  }
  else{
    removablePositions.forEach( (element) => {
      element.classList.add("remove-on")
    });
  }
}

//Populates table with data retrieved from the api call.
const populateData = (standings, leagueName) => {

  //hide certain positions based on amount of teams in league.
  const numoOfTeams = standings.length;
  hidePositions(numoOfTeams);

  document.querySelector(".table-header").innerHTML = leagueName;

  for(let i = 0; i < numoOfTeams; i++) {
    document.querySelector(".team-logo-" + i).src = standings[i].logo;
    document.querySelector(".teamName-" + i).innerHTML = standings[i].teamName;
    document.querySelector(".short-teamName-" + i).innerHTML = standings[i].teamName.slice(0,3);
    document.querySelector(".matchesPlayed-" + i).innerHTML = standings[i].all.matchsPlayed;
    document.querySelector(".goalsFor-" + i).innerHTML = standings[i].all.goalsFor;
    document.querySelector(".goalsAgainst-" + i).innerHTML = standings[i].all.goalsAgainst;
    document.querySelector(".pts-" + i).innerHTML = standings[i].points;
  }

}

window.addEventListener("load", () => {
  const league = createLeagueInfo();
  callApi(league.premier.leagueId, league.premier.leagueName);
});

executeChoice();
