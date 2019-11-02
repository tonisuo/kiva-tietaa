const Jimp = require('jimp')
const path = require('path')

const FONT_TIMES_NEW_ROMAN_16 = path.join(__dirname, "../image/times_new_roman.fnt")

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
    const font = await Jimp.loadFont(FONT_TIMES_NEW_ROMAN_16)
    return img
      .background(0xffffffff)
      .contain(TEMPLATE_WIDTH, TEMPLATE_HEIGHT + getTextHeight(font, text))
      .print(font, 10, 5, getText(text), MAX_TEXT_WIDTH)
      .write(OUTPUT)
      .getBase64Async(Jimp.MIME_JPEG)
  } catch(e) {
    console.error(e)
    throw e
  }
}

const getText = (text) => `Aku setä! ${text}`

function getTextHeight(font, text) {
  const height = Jimp.measureTextHeight(font, getText(text), MAX_TEXT_WIDTH)
  return height + 20
}