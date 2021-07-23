const Users = require('./auth-model')
 
 const  validateReqBody = (req, res, next) => {
    if(!req.body.username || !req.body.password){
        return next({
            status: 422,
            message: "username and password required"
        })
    }
    next()
  };

  const checkUsernameUnique = async (req, res, next) => {
    try{
        const user = await Users.getUserByUsername({username: req.body.username})
        if(user){
            next({
                status: 422,
                message: "username taken"
            })
        } else {
            req.user = user
            next()
        }
    }catch(err){
        next(err)
    }
  }

  const checkUsernameExists = async (req, res, next) => {
    try{
        const user = await Users.getUserByUsername({username: req.body.username})
        if(!user){
            next({
                status: 422,
                message: "invalid credentials"
            })
        } else {
            req.user = user
            next()
        }
    }catch(err){
        next(err)
    }
  }

  module.exports = {
      validateReqBody,
      checkUsernameUnique,
      checkUsernameExists
  }