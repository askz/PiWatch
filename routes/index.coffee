auth = require '../auth'
express = require 'express'
router = express.Router()

# GET home page.

router.get '/', auth, (req, res) ->
  res.render 'homeindex.html', { title: 'PiWatch' }

router.get '/settings', auth, (req, res) ->
  res.render 'settings.html', { title: 'PiWatch Settings'}

router.get '/sign_in', auth, (req, res) ->
  res.render 'login.html', { title: 'PiWatch Login'}

router.get '/api/status', (req, res) ->
  res.send('ok')

#router.get '/api/motion/control', (req, res) ->
#  res.redirect(req.protocol + '://' + req.host + ':3000/' + req.query);
#
##router.post '/api/motion/set/:option/:value', (req, res) ->
#
#router.get '/api/motion/get/:option', (req, res) ->

router.get '/api/motion/stream', (req, res) ->
  res.redirect(req.protocol + '://' + req.host + ':8081/')

router.get '/stream/html', (req, res) ->
  res.render 'stream.html'

router.post '/login', auth, (req, res) ->
  login = req.param('login');
  password = req.param('password');
  if login = 'admin' && password = 'admin'
    res.send('ok')


#  res.render 'settings.html', { title: 'PiWatch Settings'}
module.exports = router
