express = require 'express'
router = express.Router()

# GET home page.

router.get '/', (req, res) ->
  res.render './views/homeindex.html', { title: 'Express' }


module.exports = router
