module.exports = function() {
    this.isThreeOClock = isThreeOClock
}

const THREE = 3

const isThreeOClock = () =>
    new Date().getHours() === THREE


