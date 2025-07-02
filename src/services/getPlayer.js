const apiKey = '123'; // clave gratuita de TheSportsDB

// Lista de IDs de equipos famosos (puedes añadir más)
const popularTeamIds = [
    133738,	// Real Madrid
    133739,	// FC Barcelona
    133612,	// Manchester United
    133613,	// Manchester City
    133602,	// Liverpool
    133610,	// Chelsea
    133604,	// Arsenal
    133615,	// Bayern Munich
    134304,	// Borussia Dortmund
    134777,	// Juventus
    134778,	// AC Milan
    133674,	// Inter Milan
    134302,	// AS Roma
    133632,	// Paris Saint-Germain (PSG)
    134303,	// Olympique Lyonnais
    133661,	// Ajax	
    133702,	// Brasil
    133700,	// Alemania
    133695,	// Francia
    133676,	// Italia
    133722,	// España
    133694,	// Inglaterra
    133703,	// Países Bajos
    133715,	// Portugal
    133733,	// Argentina
    133714,	// Bélgica
    134792,	// Croacia
    133735	// Uruguay
];

export async function getRandomPlayerFromPopularTeams() {
  const randomTeamId = popularTeamIds[Math.floor(Math.random() * popularTeamIds.length)];
  const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/lookup_all_players.php?id=${randomTeamId}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    const players = data.player;

    if (!players || players.length === 0) throw new Error("No players found");

    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    console.log("🎯 Jugador aleatorio:", randomPlayer.strPlayer);
    console.log("👕 Equipo:", randomPlayer.strTeam);
    console.log("🌎 Nacionalidad:", randomPlayer.strNationality);
    console.log("📅 Fecha de nacimiento:", randomPlayer.dateBorn);
    console.log("📸 Imagen:", randomPlayer.strCutout || randomPlayer.strThumb);

    return randomPlayer;

  } catch (error) {
    console.error("Error al obtener jugador:", error);
  }
}