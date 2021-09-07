/* eslint-disable */

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash');
const app = express()
const port = process.env.PORT || 5001
const secret = process.env.SECRET || 'keyboard cat'

app.set('view engine', 'ejs') 
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 
app.use(session({ 
  secret,
  resave: false,
  saveUninitialized: true,
}))
app.use(flash())

app.use((req, res, next) => {
    res.locals.username = req.session.username
    res.locals.errMessage = req.flash('errMessage')
    res.locals.url = req.url
    next()
})

app.use('/public', express.static(__dirname + '/public'))

function checkIsLogin(req, res, next) {
  if (!req.session.username) {
    return res.redirect('/login')
  }

  next()
}

const userController = require('./controllers/user');
const articleController = require('./controllers/article');


app.get('/', articleController.index)

app.get('/list', articleController.list)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin)
app.get('/logout',userController.logout)
app.get('/post', checkIsLogin, articleController.post)
app.post('/post', checkIsLogin, articleController.handlePost)
app.get('/blog', articleController.blog)
app.get('/edit', checkIsLogin, articleController.edit)
app.post('/edit', checkIsLogin, articleController.handleEdit)
app.get('/admin', checkIsLogin, articleController.admin)
app.get('/delete', checkIsLogin, articleController.delete)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})