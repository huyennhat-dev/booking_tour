import express from 'express'
import db from '~/models'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from '~/config/environment'

const router = express.Router()

const loginFuc = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ApiError(404, 'Email and password are required.'))
  }

  try {
    // Tìm người dùng dựa trên email
    const user = await db.Account.findOne({
      where: { email },
      include: [
        {
          model: db.Staff,
          as: 'staffData',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: db.Manager,
          as: 'managerData',
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    })
    console.log(user)
    // Nếu không tìm thấy người dùng
    if (!user) {
      return next(new ApiError(403, 'Unauthorized'))
    }

    const match = await bcrypt.compare(password, user.dataValues.password)

    console.log(match)

    if (!match) {
      return next(new ApiError(403, 'Unauthorized'))
    }

    const token = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        username: user.dataValues.username,
        phoneNumber: user.dataValues.phone_number,
        role: user.dataValues.role,
        avatar: user.dataValues.avatar,
        id_staff: user.dataValues.staffData?.id,
        id_manager: user.dataValues.managerData?.id
      },
      env.JWT_SECRETKEY
    )

    return res.status(200).json({
      statusCode: 200,
      token: token
    })
  } catch (error) {
    return next(new ApiError(403, 'Unauthorized'))
  }
}

router.route('/').post(loginFuc)

export const adminLogin = router
