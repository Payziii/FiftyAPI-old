const { error } = require('./error.js');
const city = require('../src/guess/city.json');
const country = require('../src/guess/country.json');
const game = require('../src/guess/game.json');
const logo = require('../src/guess/logo.json');

class GuessManager {

    static guess(type) {
        if(type == "city") {
            const item = city[Math.floor(Math.random() * city.length)];
            return { code: 1, item };
        }else if(type == "country") {
            const item = country[Math.floor(Math.random() * country.length)];
            return { code: 1, item };
        }else if(type == "game") {
            const item = game[Math.floor(Math.random() * game.length)];
            return { code: 1, item };
        }else if(type == "logo") {
            const item = logo[Math.floor(Math.random() * logo.length)];
            return { code: 1, item };
        }else{
            return error(404, `type ${type} not found`)
        }
    }

}

module.exports = GuessManager