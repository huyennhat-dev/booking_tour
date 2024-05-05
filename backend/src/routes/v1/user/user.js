import express from 'express'
import tokenValidation from '~/middlewares/jwtMiddleware'
import checkRule from '~/middlewares/checkRule'
import jwt from 'jsonwebtoken'
import db from '~/models'
import env from '~/config/environment'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import authValidation from '~/validations/loginValidation'
import randomCatAvatar from '~/utils/randomCatAvatar'
import apifeature from '~/helpers/apifeature'

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
      fullName : user.dataValues.fullName,
      avatar : user.dataValues.avatar,
      role : 'customer'
    }, env.JWT_SECRETKEY)

    return res.status(200).json({
      statusCode : 200,
      token : token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        role : 'customer'
      }
    })
  } catch (error) {
    console.error(error)
    return next(new ApiError(403, 'Unauthorized'))
  }
}

const signInFuc = async (req, res, next) => {
  const { email, fullName, password, avatar = randomCatAvatar() } = req.body


  if (!email || !password || !fullName) {
    return next(new ApiError(404, 'Vui lòng điền đầy đủ thông tin.'))
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await apifeature(db.User, 'create', {
      email,
      password: hashedPassword,
      fullName,
      avatar
    })

    const userNew = await db.User.findOne({
      where: {
        email
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    })

    const token = jwt.sign(
      {
        id: user.dataValues.id,
        email: user.dataValues.email,
        fullName: user.dataValues.fullName,
        avatar: user.dataValues.avatar,
        role: 'customer'
      },
      env.JWT_SECRETKEY
    )

    return res.status(200).json({
      statusCode: 200,
      token: token,
      user: userNew
    })
  } catch (error) {
    console.error(error)
    return next(new ApiError(403, 'Tài khoản đã tồn tại trong hệ thống.'))
  }
}

const updateUser = async (req, res, next) => {
  const { fullName, avatar, current_password, new_password } = req.body
  // only update user's information
  if (fullName || avatar) {
    const dataInfoUpdate = {}
    if (fullName) dataInfoUpdate.fullName = fullName
    if (avatar) dataInfoUpdate.avatar = avatar

    await db.User.update(dataInfoUpdate, {
      where: {
        id: req.user.id
      }
    })

    const user = await db.User.findOne({
      where: {
        id: req.user.id
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    })

    const token = jwt.sign({
      id : user.dataValues.id,
      email : user.dataValues.email,
      fullName : user.dataValues.fullName,
      avatar : user.dataValues.avatar,
      role : 'customer'
    }, env.JWT_SECRETKEY)

    return res.status(200).json({
      statusCode: 200,
      message: 'Update user successfully',
      token: token,
      data: user
    })
  }
  // only update user's password
  if ( current_password && new_password) {
    const user = await db.User.findOne({
      where: {
        id: req.user.id
      }
    })

    const match = await bcrypt.compare(current_password, user.dataValues.password)

    if (!match) {
      return next(new ApiError(403, 'Mật khẩu cũ không đúng'))
    }

    const hashPassword = await bcrypt.hash(new_password, 10)

    await db.User.update({ password: hashPassword }, {
      where: {
        id: req.user.id
      }
    })

    const userNew = await db.User.findOne({
      where: {
        id: req.user.id
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
    })

    const token = jwt.sign({
      id : userNew.dataValues.id,
      email : userNew.dataValues.email,
      fullName : userNew.dataValues.fullName,
      avatar : userNew.dataValues.avatar,
      role : 'customer'
    }, env.JWT_SECRETKEY)

    return res.status(200).json({
      statusCode: 200,
      message: 'Update password successfully',
      token: token,
      data: userNew
    })
  }

  return next(new ApiError(403, 'Invalid data'))
}

router.route('/signIn').post(signInFuc)
router.route('/login').post(authValidation.login, loginFuc)
router.route('/update').put(tokenValidation.authToken, checkRule(['customer']), updateUser)


export const userRouterOnly = router