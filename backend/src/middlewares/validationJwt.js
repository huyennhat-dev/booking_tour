const jwt = require('jsonwebtoken')

function validateToken(req, res, next) {
  // Lấy token từ header
  const token = req.headers.authorization

  // Kiểm tra xem token có tồn tại hay không
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' })
  }

  try {
    // Giải mã token
    jwt.verify(token, 'mysecretkey', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' })
      }

      // Lưu thông tin người dùng từ token vào request để có thể sử dụng ở các middleware hoặc route tiếp theo
      req.user = decoded
      next()
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = validateToken