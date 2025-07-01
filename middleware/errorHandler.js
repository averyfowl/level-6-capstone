module.exports = (err, req, res, next) => {
    console.error(err.name, err.message)
  
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ errMsg: 'Token not valid or missing' })
    }
  
    res.status(err.status || 500).send({ errMsg: err.message || 'Server Error' })
  }
  