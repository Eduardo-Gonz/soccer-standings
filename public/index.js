
const assignBtns = () => {

  const premierLeague = document.querySelector(".premier-btn");
  const laLiga = document.querySelector(".liga-btn");
  const bundesliga = document.querySelector(".bundesliga-btn");
  const seriaA = document.querySelector(".seria-btn");
  const ligue1 = document.querySelector(".ligue-btn");

  premierLeague.addEventListener("click", () => {
    const premId = 2790;
    console.log("clicked");
    callApi(premId);
  });

  laLiga.addEventListener("click", () => {
    const ligaId = 2833;
    console.log("clicked");
    callApi(ligaId);
  });

  bundesliga.addEventListener("click", () => {
    const bundesligaId = 2755;
    console.log("clicked");
    callApi(bundesligaId);
  });

  seriaA.addEventListener("click", () => {
    const seriaId = 2857;
    console.log("clicked");
    callApi(seriaId);
  });

  ligue1.addEventListener("click", () => {
    const ligueId = 2664;
    console.log("clicked");
    callApi(ligueId);
  });
}


const callApi = (leagueId) => {
  fetch("https://api-football-v1.p.rapidapi.com/v2/leagueTable/" + leagueId, {
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
  		"x-rapidapi-key": "5d57b8c6f1mshfea26e104664317p170162jsn99bed2e8e7c0"
  	}
  })
  .then(response => response.json() )
  .then(data => {
    let standings = data.api.standings;
    console.log(data);
    populateData(standings);

  })

  .catch(err => {
  	console.log(err);
  });
}

const populateData = (standings) => {
console.log(standings[0]);
  for(let i = 0; i < standings[0].length; i++) {
    document.querySelector(".teamName-" + i).innerHTML = standings[0][i].teamName;
    document.querySelector(".goalsFor-" + i).innerHTML = standings[0][i].all.goalsFor;
    document.querySelector(".goalsAgainst-" + i).innerHTML = standings[0][i].all.goalsAgainst;
    document.querySelector(".pts-" + i).innerHTML = standings[0][i].points
  }

}

assignBtns();
