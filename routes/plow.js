var express = require('express')
var router = express.Router()
var { chromium } = require('playwright')

const config = require('config')
const fs = require('fs')
const cors = require('cors')
const MAXZ = 15


// global variables
let busy = false

var app = express()
app.use(cors())


//from plow
const tile2long = (x, z) => {
  return x / 2 ** z * 360 - 180
}

const tile2lat = (y, z) => {
  const n = Math.PI - 2 * Math.PI * y / 2 ** z
  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)))
}

const jumpInto = async (page, z, x, y) => {
  let waitT = 2500 * (MAXZ - z)
  if (z < MAXZ - 4){
   waitT = 10000
  }
  await page.goto(
    `https://hfu.github.io/plow/#${z}/${tile2lat(y + 0.5, z)}/${tile2long(x + 0.5, z)}` //location of the map
  )
  await page.waitForNavigation()
  await page.waitForTimeout(waitT)  //gray image appears without this

//replaced (from here)
// see https://playwright.dev/docs/screenshots/?_highlight=screenshot#capture-into-buffer
//  const path = `docs/img/${z}/${x}/${y}.png`
//  await page.screenshot({
//    path: path,
//    clip: {
//      x: 128,
//      y: 128,
//      width: 512,
//      height: 512
//    }
//  })
//console.log(path)

//var buff //if buff is declared here, an error occur....
buff = await page.screenshot({
    clip: {
      x: 128,
      y: 128,
      width: 512,
      height: 512
    }
  })
//console.log(buff.toString('base64')); //need when checking

//replaced (until here)

//neee to be edited
/*
  if (z === MAXZ) {
  } else {
    await jumpInto(page, z + 1, x * 2 + 0, y * 2 + 0)
    await jumpInto(page, z + 1, x * 2 + 1, y * 2 + 0)
    await jumpInto(page, z + 1, x * 2 + 0, y * 2 + 1)
    await jumpInto(page, z + 1, x * 2 + 1, y * 2 + 1)
  }
*/
}




/* GET png */
router.get(`/raster/:Z/:X/:Y.png`, 
 async function(req, res) {
  busy = true
  const Z = parseInt(req.params.Z)
  const X = parseInt(req.params.X)
  const Y = parseInt(req.params.Y)

/* (for azure)
if (!req.session.userId) {
  // reply error message
    res.status(404).send(`Please log in to get: /plow/raster/${Z}/${X}/${Y}.png`)
   busy = false
    } else {
*/
// const browser = await chromium.launch({ headless: false }) //need when checking
 const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({
    viewport: { width: 768, height: 768 }
  })


//  await page.goto(`https://hfu.github.io/plow/#8/32.7528/129.888`)
//  await page.waitForTimeout(3000)
//  await jumpInto(page, Z, X, Y)
  await jumpInto(page, Z, X, Y)
  await browser.close()

//      if (buff.body) {
//        res.set('content-type', 'image/png')
//        res.set('content-encoding', 'gzip')
        res.send(buff)
        //res.send(fs.writeFileSync(buff))
        busy = false
//      } else {
//        res.status(404).send(`tile not found: /plow/raster/${Z}/${X}/${Y}.png`)
//        busy = false
//      }


//  res.status(404).send(`tile not found: /raster/${Z}/${X}/${Y}.pbf`)
  busy = false  

/* (for Azure)
}
*/

}
)








module.exports = router;