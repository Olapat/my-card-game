const allFire = require('./card_fire');
const allGreen = require('./card_green');
const allWater = require('./card_water');

module.exports = {
    ...allFire,
    ...allGreen,
    ...allWater
}
