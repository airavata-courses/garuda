const fs = require('fs');

let usercount = process.argv[2] || 1000;

let users = "";

for (let i = 0; i < usercount; i++) {
    let user = `custos_user${i}\n`;
    users += user;
}

// write to a new file named username.txt
fs.writeFile('username.txt', users, (err) => {
    // throws an error
    if (err) throw err;

    // success case, the file was saved
    console.log(`${usercount} users getnerated!`);
});
