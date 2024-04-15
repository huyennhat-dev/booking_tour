import authService from '~/services/auth/authService'
import { StatusCodes } from 'http-status-codes'

const login = async (req, res, next) => {
  try {
    const data = await authService.LoginFeature('GIANGVIEN', req.body , req.sql)
    res.status(StatusCodes.OK).json({
      data : data
    })
  } catch (error) {
    next(error)
  }
}


const GiangVienAuthController = {
  login
}

export default GiangVienAuthController