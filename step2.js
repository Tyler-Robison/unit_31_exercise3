const fs = require('fs');
const argv = process.argv;
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.kill(1)
        }
        console.log('data: ', data)
    })
}

async function webCat(URL) {
    try {
        const resp = await axios.get(URL);
        console.log(resp.data)
    } catch (err) {
        console.error(`error fetching ${URL} error: ${err}`);
        process.kill(1)
    }
}

const path = argv[2]

if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}

