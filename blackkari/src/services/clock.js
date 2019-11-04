const config = require('../config.json')

module.exports = function () {
  this.isThreeOClock = isThreeOClock
}

const isThreeOClock = () =>
    new Date().getHours() === config.clock.notificationHour


