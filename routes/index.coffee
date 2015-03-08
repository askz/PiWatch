auth = require '../auth'
express = require 'express'
router = express.Router()

# GET home page.

router.get '/', auth, (req, res) ->
  res.render 'homeindex.html', { title: 'PiWatch' }

router.get '/settings', auth, (reg, res) ->
  res.render 'settings.html', { title: 'PiWatch Settings'}
module.exports = router
