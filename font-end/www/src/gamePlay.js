var cardP1 = null, cardP2 = null;
var resJsonPOST;
var resJsonGetCard;
var hp1, hp2, ar1, ar2;
var round = 1;
var acpI;   //allCardPlayer
var acpII;
var cardInHand = [];

async function start() {
    hp1 = 30;
    hp2 = 30;
    ar1 = 0;
    ar2 = 0;

    document.getElementById('hp1').textContent = hp1;
    document.getElementById('hp2').textContent = hp2;
    document.getElementById('round').textContent = round;


    try {
        const resGetCard = await get('/get-card-all');
        if (resGetCard.ok) {
            resJsonGetCard = await resGetCard.json();
            // console.log(resJsonGetCard);
            if (resJsonGetCard && resJsonGetCard.length > 0) {
                acpI = shuffleIndexCard(resJsonGetCard);
                console.log(acpI);
                //แก้ไขการสุ่มเหมือนกันสองอัน โดยการใช้ setTimeout เพื่อถ่วงเวลา
                setTimeout(() => {
                    acpII = shuffleIndexCard(resJsonGetCard);
                    console.log(acpII);
                    cardInHand.push(acpII[0], acpII[1], acpII[2]);
                    console.log(cardInHand);
                    // cardInHand.forEach((va, index) => {
                    //     document.getElementById(`bnt-card-hand${index + 1}`).textContent = va;
                    // });
                    const cardHand = cardInHand.length > 0 ? cardInHand.map((va, index) =>
                        `<button id="bnt-card-hand${index + 1}" class="card" onclick="p2SelectCard('${va}')">
                            ${va}
                        </button>`
                    ) : [];
                    document.getElementById('card-in-hand').innerHTML = cardHand.join('');
                }, 300)

            }
        } else {
            throw new Error("Network response was not ok. '/get-card-all' ");
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

start();

function p1SelectCard(name) {
    console.log(name);
    cardP1 = name;
    document.getElementById('card-play1').textContent = cardP1;
}

function p2SelectCard(name) {
    console.log(name);
    cardP2 = name;
    document.getElementById('card-play2').textContent = cardP2;
}

async function thisOk() {
    console.log(cardP1, cardP2);
    // console.log(AllCard());
    const res = await get('/');
    const resJson = await res.json();
    console.log(resJson);

    const resPOST = await post('/end-trun-p1&&p2', { cardP1, cardP2 });
    resJsonPOST = await resPOST.json();
    console.log(resJsonPOST);

    hp1 = resJsonPOST ? resJsonPOST.player1.hp : hp1;
    hp2 = resJsonPOST ? resJsonPOST.player2.hp : hp2;

    ar1 = resJsonPOST ? resJsonPOST.player1.armor : ar1;
    ar2 = resJsonPOST ? resJsonPOST.player2.armor : ar2;

    document.getElementById('hp1').textContent = hp1;
    document.getElementById('hp2').textContent = hp2;

    document.getElementById('armor1').textContent = ar1;
    document.getElementById('armor2').textContent = ar2;

    // Save data to sessionStorage
    sessionStorage.setItem('player1', JSON.stringify(resJsonPOST.player1));
    sessionStorage.setItem('player2', JSON.stringify(resJsonPOST.player2));

    // Get saved data from sessionStorage
    let data = sessionStorage.getItem('player1');

    // console.log(JSON.parse(data));
    // Remove saved data from sessionStorage
    // sessionStorage.removeItem('key');

    // Remove all saved data from sessionStorage
    // sessionStorage.clear();

    round++;
    document.getElementById('round').textContent = round;


};

async function thisSell() {
    console.log(cardP1, cardP2, "Sell");
    try {
        const resPOST = await post('/sell', { name: "p2", card: cardP2 });
        if (resPOST.ok) {
            const resJsonPOST = await resPOST.json();
            console.log(resJsonPOST);
        } else {
            throw new Error("Network response was not ok.");
        }
    } catch (error) {
        console.log(error);
        return error;
    }

};


var cardIndexP1 = 0;
var cardIndexP2 = 3;
function pickCard(player) {
    switch (player) {
        case 'player1':
            const c1 = acpI[cardIndexP1];
            cardIndexP1++;
            console.log(c1);
            break;

        case 'player2':
            const c2 = acpII[cardIndexP2];
            cardIndexP2++;
            console.log(c2);
            cardInHand.push(c2);
            const cardHand = cardInHand.length > 0 ? cardInHand.map((va, index) =>
                `<button id="bnt-card-hand${index + 1}" class="card" onclick="p2SelectCard('${va}')">
                    ${va}
                </button>`
            ) : [];
            document.getElementById('card-in-hand').innerHTML = cardHand.join('');

            if (cardHand.length >= 5) {
                document.getElementById('card-all').disabled = true;
            } else {
                document.getElementById('card-all').disabled = false;
            }
            break;
        default:
            break;
    }

}