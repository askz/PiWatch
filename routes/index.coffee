auth = require '../auth'
utils = require '../utils'
express = require 'express'
router = express.Router()

httpProxy = require('http-proxy');

apiProxy = httpProxy.createProxyServer();


# GET home page.

router.get '/', auth, (req, res) ->
  res.render 'homeindex.html', { title: 'PiWatch' }

router.get '/settings', auth, (req, res) ->
  res.render 'settings.html', { title: 'PiWatch Settings'}

router.get '/sign_in', auth, (req, res) ->
  res.render 'login.html', { title: 'PiWatch Login'}

router.get '/api/status', (req, res) ->
  res.send('ok')

router.post '/api/motion/set', (req, res) ->
  utils.setMotionOption req.body.option, req.body.value
  res.send('ok')

router.get '/api/motion/get/:option', (req, res) ->
  variable = utils.getMotionOption req.params.option
  debugger
  res.send variable

router.get '/api/motion/stream', auth, (req, res) ->
  apiProxy.web req, res, { target: 'http://localhost:8081/' }

router.get '/api/motion/config/*', auth, (req, res) ->
  apiProxy.web req, res, { target: 'http://localhost:8082/' }

router.get '/stream/html', auth, (req, res) ->
  res.render 'stream.html'

#router.post '/login', (req, res) ->
#  login = req.params('login');
#  password = req.params('password');
#  if login = 'admin' && password = 'admin'
#    res.send('ok')


#  res.render 'settings.html', { title: 'PiWatch Settings'}
module.exports = router
