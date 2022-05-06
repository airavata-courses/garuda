const fs = require('fs');

let groups = process.argv[2] || 1000;

let users = "";

for (let i = 0; i < groups; i++) {
    let user = `garuda_group${i}\n`;
    users += user;
}

// write to a new file named username.txt
fs.writeFile('group.txt', users, (err) => {
    // throws an error
    if (err) throw err;

    // success case, the file was saved
    console.log(`${groups} group generated!`);
});
