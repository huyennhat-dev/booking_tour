import express from 'express'
import db from '~/models'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import apifeature from '~/helpers/apifeature'
import jwt from 'jsonwebtoken'
import randomCatAvatar from '../../../utils/randomCatAvatar'

const router = express.Router()

const signInFuc = async (req, res, next) => {
  const { email, fullName, password, avatar = randomCatAvatar() } = req.body

  console.log(req.body)

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


    const token = jwt.sign({
      id : user.dataValues.id,
      email : user.dataValues.email,
      fullName : user.dataValues.username,
      avatar : user.dataValues.avatar,
      role : 'customer'
    }, 'mysecretkey')

    return res.status(200).json({
      statusCode : 200,
      token : token,
      user: {
        id : user.dataValues.id,
        email : user.dataValues.email,
        full_name : user.dataValues.username,
        avatar : user.dataValues.avatar,
        role : 'customer'
      }
    })


  } catch (error) {
    console.error(error)
    return next(new ApiError(403, 'Tài khoản đã tồn tại trong hệ thống.'))
  }
}


router.route('/').post(signInFuc)

export const userSignIn = router