import express from 'express'
import db from '~/models'
import ApiError from '~/utils/ApiError'
import bcrypt from 'bcryptjs'
import apifeature from '~/helpers/apifeature'
import jwt from 'jsonwebtoken'
import authValidation from '~/validations/loginValidaton'

const router = express.Router()

const SignInFuc = async (req, res, next) => {
  const { email, password, phone_number, username, birth_day } = req.body

  if (!email || !password || !phone_number || !username || !birth_day) {
    return next(new ApiError(404, 'Vui lòng điền đầy đủ thông tin.'))
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await apifeature(db.User, 'create', {
      email,
      password: hashedPassword,
      phone_number,
      username,
      role : 'customer'
    })

    const customer = await apifeature(db.Customer, 'create', {
      id_customer : user.dataValues.id,
      full_name : username,
      birth_day : birth_day,
      point_evaluation : 1
    })

    console.log(user)
    console.log(customer)

    const token = jwt.sign({
      id : user.dataValues.id,
      email : user.dataValues.email,
      username : user.dataValues.username,
      phone_number : user.dataValues.phone_number,
    }, 'mysecretkey')

    return res.status(200).json({
      statusCode : 200,
      token : token,
      user: {
        id : user.dataValues.id,
        email : user.dataValues.email,
        username : user.dataValues.username,
        phone_number : user.dataValues.phone_number,
      }
    })


  } catch (error) {
    console.error(error)
    return next(new ApiError(403, 'Tài khoản đã tồn tại trong hệ thống.'))
  }
}


router.route('/').post(authValidation.signIn,SignInFuc)

export const SignInRouter = router