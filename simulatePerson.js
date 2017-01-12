const db = require('./db').collection('pessoas_posicao');

var items = [
    { latitude: -23.6103431143879, longitude: -46.66349270548784 },
    { latitude: -23.610308706828576, longitude: -46.663531597518556 },
    { latitude: -23.61026938389257, longitude: -46.66357719507181 },
    { latitude: -23.610219001363575, longitude: -46.66363888587915 },
    { latitude: -23.610152643856804, longitude: -46.66371801104509 },
    { latitude: -23.610214085993853, longitude: -46.66377031412088 },
    { latitude: -23.610265697366714, longitude: -46.66381322946512 },
    { latitude: -23.610285358836748, longitude: -46.663841392659776 },
    { latitude: -23.610265697366714, longitude: -46.66381322946512 },
    { latitude: -23.610214085993853, longitude: -46.66377031412088 },
    { latitude: -23.610152643856804, longitude: -46.66371801104509 },
    { latitude: -23.610219001363575, longitude: -46.66363888587915 },
    { latitude: -23.61026938389257, longitude: -46.66357719507181 },
    { latitude: -23.610308706828576, longitude: -46.663531597518556 },
    { latitude: -23.6103431143879, longitude: -46.66349270548784 },

]
var count = 0;
setInterval(() => {
    count += 1;
    var item = items[count];
    if (!item) {
        clearInterval(this);
        return;
    }
    item.ultimaAtualizacao = new Date();
    // item.ultimaAtualizacao.setMilliseconds(0);
    item.name = 'Erick';
    console.log('inserted: ', item.ultimaAtualizacao);
    db.insert(item);
}, 1000) ;


