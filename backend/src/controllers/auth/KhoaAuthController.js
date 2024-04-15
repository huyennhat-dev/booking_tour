import authService from '~/services/auth/authService'
import { StatusCodes } from 'http-status-codes'

const login = async (req, res, next) => {
  try {
    const result = await authService.LoginFeature('KHOA', req.body , req.sql)

    res.status(StatusCodes.OK).json({
      data : result
    })

  } catch (error) {
    next(error)
  }
}


const KhoaAuthController = {
  login
}

export default KhoaAuthController