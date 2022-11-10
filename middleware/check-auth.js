const router = require('express').Router()
const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
      try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const verfiy= jwt.verify(token,'this is dummy text' )
        next()
      } catch (error) {
        return res.status(401).json({msg:'invalid token'})
        
      }
}
//module.exports = router   