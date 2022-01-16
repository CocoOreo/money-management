module.exports = (req, res, next) => {
  console.log('path =>', req.path)
  console.log('body =>', req.body)
  console.log('method =>', req.method)
  if (req.method === 'POST') {
    if (req.path === '/api/login' || req.path === '/api/register') {
      if (req.body.username === '123' && req.body.password === '123') {
        return res.status('200').json({
          user: {
            // jwt
            token: '123',
            username: 'jack'
          }
        })
      } else {
        return res.status('400').json({
          message: 'Wrong username or password'
        })
      }
    }
  }
  next()
}
