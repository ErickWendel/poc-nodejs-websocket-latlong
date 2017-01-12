"use strict";

const every = require('every-moment');
const bluebird = require('bluebird');
const db = bluebird.promisifyAll(require('./db').collection('pessoas_posicao'));
let count = 0;
let loggedUsers = [];
class Cron {

    init(client, name) {
        var that = this;
        loggedUsers.push({ client: client, name: name });
        every(200, 'milliseconds', () => {
            loggedUsers.map((item) => {
                let query = { name: item.name };
                let user = that.getUser(name);
                if (user.ultimaAtualizacao)
                    query.ultimaAtualizacao = { $gt: user.ultimaAtualizacao };

                db.findAsync(query)
                    .then(function (result) {
                        console.log('result', result);
                        if (result.length == 0) return;

                        //last item
                        let itemDb = result[result.length - 1];
                        let latitude = itemDb.latitude;
                        let longitude = itemDb.longitude;
                        let user = that.updateLoggedUser(name, itemDb.ultimaAtualizacao);

                        client.emit('pessoa:' + user.name, { latitude, longitude });
                        console.log('emit: ' + user.name + " " + new Date().getTime());
                    });

            });
        });
    }
    delete(name) {
        loggedUsers = loggedUsers.filter(m => m.name !== name);
        if (loggedUsers.length === 0) return loggedUsers;
        console.log('removido', loggedUsers[0].name);
        return loggedUsers;
    }

    updateLoggedUser(name, updateDate) {
        var user = this.getUser(name);
        if (user == null) return null;
        user.ultimaAtualizacao = updateDate;
        return user;

    }
    getUser(name) {
        var user = loggedUsers.filter(m => m.name === name);
        if (user.length === 0) return null;
        return user[0];
    }

}
module.exports = Cron  