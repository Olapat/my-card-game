const hp1 = resJsonPOST ? resJsonPOST.player1.hp : 30;
const hp2 = resJsonPOST ? resJsonPOST.player2.hp : 30;

document.getElementById('hp1').textContent = hp1;
document.getElementById('hp2').textContent = hp2;