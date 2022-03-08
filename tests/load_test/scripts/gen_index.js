const fs = require('fs');

let indexcount = process.argv[2] || 25;

let stations = "";

for (let i = 0; i < indexcount; i++) {
    let stationIndex = `${i}\n`;
    stations += stationIndex;
}

// write to a new file named indexes.txt
fs.writeFile('indexes.txt', stations, (err) => {
    // throws an error
    if (err) throw err;

    // success case, the file was saved
    console.log(`${indexcount} indexes getnerated!`);
});
