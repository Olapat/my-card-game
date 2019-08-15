var base_URL = "http://localhost:7000";

const option = (Method, data) => {
    return {
        method: Method, // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, cors, *same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
    // .then(response => response.json()); // parses JSON response into native JavaScript objects 
}

async function get(url) {
    const res = await fetch(`${base_URL}${url}`, option("GET"));
    return res;
}

async function post(url, data) {
    const res = await fetch(`${base_URL}${url}`, option("POST", data));
    return res;
}
