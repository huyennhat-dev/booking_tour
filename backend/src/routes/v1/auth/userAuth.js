import express from 'express'
import db from '~/models'
import ApiError from '~/utils/ApiError'

const router = express.Router()

const loginFuc = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ApiError(404, 'Email and password are required.'))
  }

  try {
    // Tìm người dùng dựa trên email
    const user = await db.User.findOne({ where: { email } })


    // Nếu không tìm thấy người dùng
    if (!user) {
      return next(new ApiError(403, 'Unauthorized'))
    }

    if (password !== user.password) {
      return next(new ApiError(403, 'Unauthorized'))
    }

    return res.status(200).json({
      jwt : 'con cac',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        phone_number: user.phone_number
      }
    })
  } catch (error) {
    console.error(error)
    return next(new ApiError(403, 'Unauthorized'))
  }
}


router.route('/')
  .post(loginFuc)

export const authRouter = router