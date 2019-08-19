
async function getRooms() {
    const response = await get('/get-rooms');
    const responseJSON = await response.json();
    console.log(responseJSON);



    if (responseJSON) {

        for (const key in responseJSON) {
            if (responseJSON.hasOwnProperty(key)) {
                // const value = responseJSON[key];
                const li = document.createElement("li");
                const btn = document.createElement("button");
                const a = document.createElement("a");
                a.href = "game_play.html";
                btn.onclick = () => joinRoom(key);
                const t = document.createTextNode("enter room-" + key);
                btn.appendChild(t);
                a.appendChild(btn);
                li.appendChild(a);
                document.getElementById("rooms").appendChild(li);
            }
        }
        // responseJSON.forEach((va, index) => {
        //     const li = document.createElement("li");
        //     const btn = document.createElement("button");
        //     const a = document.createElement("a");
        //     a.href = "game_play.html";
        //     btn.onclick = () => joinRoom(va.keyRoom);
        //     const t = document.createTextNode("enter room-" + va.keyRoom);
        //     btn.appendChild(t);
        //     a.appendChild(btn);
        //     li.appendChild(a);
        //     document.getElementById("rooms").appendChild(li);
        // });
    }

    // const rooms = responseJSON.length > 0 ? responseJSON.map((va, index) => 
    //     `<div> enter room: <a href="#"><button onclick="joinRoom(${va})">join room-${va.keyRoom}</button></a> by ${va.player1} </div>`
    // ) : [];
    // document.getElementById('rooms').innerHTML = rooms.join('');
}

getRooms();

async function createRoom() {
    const response = await post('/create-room', { playerName });
    const responseJSON = await response.json();
    console.log(responseJSON);
}

async function joinRoom(keyRoom) {
    const response = await post(`/join-rooms-${keyRoom}`, { playerName });
    // const responseJSON = await response.json();
    // console.log(responseJSON);
}