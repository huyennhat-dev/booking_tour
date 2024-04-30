import express from 'express'
import db from '~/models'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authValidation from '~/validations/loginValidation'


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

    const match = await bcrypt.compare(password, user.dataValues.password)

    if (!match) {
      return next(new ApiError(403, 'Unauthorized'))
    }

    const token = jwt.sign({
      id : user.dataValues.id,
      email : user.dataValues.email,
      fullName : user.dataValues.username,
    }, 'mysecretkey')

    return res.status(200).json({
      statusCode : 200,
      token : token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      }
    })
  } catch (error) {
    console.error(error)
    return next(new ApiError(403, 'Unauthorized'))
  }
}


router.route('/').post(authValidation.login, loginFuc)

export const userLogin = router