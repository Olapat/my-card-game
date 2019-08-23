let playerName = sessionStorage.getItem('player_name');

playerName = JSON.parse(playerName);

if (!playerName || playerName === 'null') {
    playerName = prompt("Please enter your name:", "olapat");
    console.log(playerName);

    sessionStorage.setItem('player_name', JSON.stringify(playerName));
}

console.log(playerName);

async function createPlayer() {
    const response = await post('/create-player', { playerName });
    const responseJSON = await response.json();
    console.log(responseJSON);
}

createPlayer();
