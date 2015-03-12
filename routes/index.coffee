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

router.get '/about', (req, res) ->
  res.render 'about.html', { title: 'PiWatch About'}

router.get '/sign_in', auth, (req, res) ->
  res.render 'login.html', { title: 'PiWatch Login'}

router.get '/api/status', (req, res) ->
  res.send('ok')

router.post '/api/motion/set', (req, res) ->
  utils.setMotionOption req.body.option, req.body.value
  res.send('ok')

router.get '/api/motion/get/:option', (req, res) ->
  variable = utils.getMotionOption req.params.option
  res.send variable

router.get '/api/motion/stream', auth, (req, res) ->
  apiProxy.web req, res, { target: 'http://localhost:8081/' }

router.get '/api/motion/config/*', auth, (req, res) ->
  apiProxy.web req, res, { target: 'http://localhost:8082/' }

router.get '/stream/html', auth, (req, res) ->
  res.render 'stream.html'



router.get '/beacon/enter', auth, (req, res) ->
  utils.setMotionOption('webcam_port', '');




#  res.render 'settings.html', { title: 'PiWatch Settings'}
module.exports = router
