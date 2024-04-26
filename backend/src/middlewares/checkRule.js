const checkRule = (permission) => {
  return (req, res, next) => {
    const role = req.user.role
    if (!role) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Bạn không có quyền truy cập'
      })
    }
    if (!permission.includes(role)) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Bạn không có quyền truy cập'
      })
    }
    next()
  }
}

export default checkRule


