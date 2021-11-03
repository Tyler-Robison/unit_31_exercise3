const fs = require('fs');
const argv = process.argv;
const axios = require('axios')

function cat(path, outputFile) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.kill(1)
        }
        handleData(data, outputFile)
    })
}

async function webCat(URL, outputFile) {
    try {
        const resp = await axios.get(URL);
        data = resp.data
        handleData(data, outputFile)
    } catch (err) {
        console.error(`error fetching ${URL} error: ${err}`);
        process.kill(1)
    }
}

function handleData(data, outputFile) {
    if (outputFile) {
        fs.writeFile(outputFile, data, 'utf8', err => {
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(data);
    }
}

const entered_path = argv[2]

let path;
let outputFile;

function checkPath(entered_path) {
    if (entered_path === '--out') {
        outputFile = argv[3]
        path = argv[4]
    }
    else {
        path = entered_path
    }
    if (path.slice(0, 4) === 'http') {
        webCat(path, outputFile);
    } else {
        cat(path, outputFile);
    }
}

checkPath(entered_path)