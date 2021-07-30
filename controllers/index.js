const router = require('express').Router()

const homeRoutes = require('./home-routes')
const apiRoutes = require('./api/userRoutes')

router.use('/', homeRoutes)
router.use('/api', apiRoutes)


module.exports = router;