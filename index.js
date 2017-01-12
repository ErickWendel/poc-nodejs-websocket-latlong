'use strict'
const io = require('socket.io')();
const db = require('./db');
const Cron = require('./cron');
const cron = new Cron();
let allClients = [];
io.on('connection', (client) => {
    var user = client.handshake.query.user;
    if (typeof user !== "undefined") {
        user = JSON.parse(user);
        allClients.push(user);
        console.log("%s connected", user.name);
        cron.init(client, user.name);
    }

    // client.on('load topics', () => {
    //     client.emit('loaded topics', '');
    // });

    client.on('disconnect', () => {

        var user = JSON.parse(client.handshake.query.user);
        allClients.pop(client);
        let users = cron.delete(user.name);
        console.log('disconnect', user);
        console.log(' disconnected from forum - active users: ' + allClients.length);
        console.log('users: ' + users.length);

    });
});



///////////////////////////////////////////////

io.listen(3001);
