express = require 'express'
router = express.Router()

# GET home page.

router.get '/', (req, res) ->
  res.render 'homeindex.html', { title: 'Express' }


module.exports = router
