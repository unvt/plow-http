//require('dotenv').config() //for azure in the future

const config = require('config')
const fs = require('fs')
var createError = require('http-errors')
var cookieParser = require('cookie-parser')
const express = require('express')
const path = require('path')
//const spdy = require('spdy') //for https

const cors = require('cors')
const morgan = require('morgan')

const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')


// config constants
const morganFormat = config.get('morganFormat')
const htdocsPath = config.get('htdocsPath')
//const privkeyPath = config.get('privkeyPath')
//const fullchainPath = config.get('fullchainPath')
const port = config.get('port')
const defaultZ = config.get('defaultZ')
//const mbtilesDir = config.get('mbtilesDir')
//const fontsDir = config.get('fontsDir')
const logDirPath = config.get('logDirPath')

// global variables
let mbtilesPool = {}
let tz = config.get('tz')
let busy = false

// logger configuration
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: `${logDirPath}/plow-http-%DATE%.log`,
            datePattern: 'YYYY-MM-DD'
        })
    ]
})

logger.stream = {
    write: (message) => { logger.info(message.trim()) }
}




const app = express()

var indexRouter = require('./routes/index')
var plowRouter = require('./routes/plow')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
//app.use(logger('dev'))
app.use(cors())
app.use(morgan(morganFormat, {
    stream: logger.stream
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


//app.use(express.static('public'))
//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, htdocsPath)))

app.use('/', indexRouter)
app.use('/plow', plowRouter)



// error handler
//app.use((req, res) => {
//    res.sendStatus(404)
//})

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})



////for https
//spdy.createServer({
//    key: fs.readFileSync(privkeyPath),
//   cert: fs.readFileSync(fullchainPath)
//}, app).listen(port)

//for http
app.listen(port, () => {
    console.log(`Running at Port ${port} ...`)
})


