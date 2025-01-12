const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const methodOverride = require('method-override')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: true}))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use('/upload', express.static(__dirname + '/upload'))

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

require('./routes')(app, passport)

module.exports = app
