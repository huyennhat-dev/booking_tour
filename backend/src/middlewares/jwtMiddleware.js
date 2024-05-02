import jwt from 'jsonwebtoken'

const authToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token)
    return res.status(403).json({
      statusCode:403,
      message: 'Token is required'
    })

  try {
    const decoded = jwt.verify(token, 'mysecretkey')
    console.log(decoded)
    req.user = decoded
  } catch (err) {
    return res.status(403).json({
      statusCode:403,
      message: 'Invalid token'
    })
  }
  return next()
}


export default {
  authToken
}
