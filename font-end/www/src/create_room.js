
async function getRooms() {
    const response = await get('/get-rooms');
    const responseJSON = await response.json();
    console.log(responseJSON);

    if (responseJSON.length > 0) {
        responseJSON.forEach((va, index) => {
            const li = document.createElement("li");
            const btn = document.createElement("button");
            btn.onclick = () => joinRoom(va.keyRoom);
            const t = document.createTextNode("enter room-" + va.keyRoom);
            btn.appendChild(t);
            li.appendChild(btn);
            document.getElementById("rooms").appendChild(li);
        });
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