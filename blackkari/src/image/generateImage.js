const Jimp = require('jimp')
const path = require('path')

const TEMPLATE = path.join(__dirname, "../image/kiva_template.jpg")
const OUTPUT = path.join(__dirname, "../image/kiva_rendered.jpg")

const TEMPLATE_WIDTH = 300
const TEMPLATE_HEIGHT = 292

const MAX_TEXT_WIDTH = TEMPLATE_WIDTH - 20

/**
 * Adds text to kivaa tietaa image template
 */
module.exports = async function (text) {
  try {
    const img = await Jimp.read(TEMPLATE)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK)
    img
      .background(0xffffffff)
      .contain(TEMPLATE_WIDTH, TEMPLATE_HEIGHT + getTextHeight(font, text))
      .print(font, 10, 5, getText(text), MAX_TEXT_WIDTH)
      .write(OUTPUT)

    return 'OK'
  } catch(e) {
    console.error(e)
    return 'VOE PASKA!'
  }
}

const getText = (text) => `Aku setä! ${text}`

function getTextHeight(font, text) {
  const height = Jimp.measureTextHeight(font, getText(text), MAX_TEXT_WIDTH)
  return height + 20
}