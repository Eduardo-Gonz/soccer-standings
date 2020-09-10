
//Assigns onclick event listeners to the 5 different league p tags in index.html.
const assignBtns = () => {

  const premierLeague = document.querySelector(".premier-btn");
  const laLiga = document.querySelector(".liga-btn");
  const bundesliga = document.querySelector(".bundesliga-btn");
  const seriaA = document.querySelector(".seria-btn");
  const ligue1 = document.querySelector(".ligue-btn");
  let leagueName = "";

//optimizable
  premierLeague.addEventListener("click", () => {
    const premId = 2790;
    leagueName = "Premier League";
    console.log("clicked");
    callApi(premId, leagueName);
  });

  laLiga.addEventListener("click", () => {
    const ligaId = 2833;
    leagueName = "La Liga";
    console.log("clicked");
    callApi(ligaId, leagueName);
  });

  bundesliga.addEventListener("click", () => {
    const bundesligaId = 2755;
    leagueName = "Bundesliga";
    console.log("clicked");
    callApi(bundesligaId, leagueName);
  });

  seriaA.addEventListener("click", () => {
    const seriaId = 2857;
    leagueName = "Seria A";
    console.log("clicked");
    callApi(seriaId, leagueName);
  });

  ligue1.addEventListener("click", () => {
    const ligueId = 2664;
    leagueName = "Ligue 1";
    callApi(ligueId, leagueName);
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

assignBtns();
