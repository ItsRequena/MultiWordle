const apiKey = '123'; // clave gratuita de TheSportsDB

// Lista de IDs de equipos famosos (puedes añadir más)
const popularTeamIds = [
    133738,	// Real Madrid ✅
    133739,	// FC Barcelona ✅
    133729,	// Atelico de Madrid ✅
    133722,	// Betis ✅
    133727,	// Athletic-Bilbao ✅
    133735,	// Sevilla ✅
    133612,	// Manchester United ✅
    133616,	// Tottenham Hotspur ✅
    133602,	// Liverpool ✅
    133604,	// Arsenal ✅
    133610,	// Chelsea ✅
    133613,	// Manchester City ✅
    133664,	// Bayern Munich ✅
    133650,	// Borussia Dortmund ✅
    133666,	// Bayern Leverkusen ✅
    133676,	// Juventus ✅
    133667,	// AC Milan ✅
    133681,	// Inter Milan ✅
    134243,	// Como ✅
    133670,	// Napoles ✅
    133682,	// Roma ✅
    133714,	// Paris Saint-Germain (PSG) ✅
    133772	// Ajax ✅
];

export async function getRandomPlayer() {
  const randomTeamId = popularTeamIds[Math.floor(Math.random() * popularTeamIds.length)];
  const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/lookup_all_players.php?id=${randomTeamId}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    const players = data.player;

    if (!players || players.length === 0) throw new Error("No players found");

    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    return randomPlayer;

  } catch (error) {
    console.error("Error al obtener jugador:", error);
  }
}