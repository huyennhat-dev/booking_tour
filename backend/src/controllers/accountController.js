import accountService from '~/services/accountService'
import db from '~/models'
import env from '~/config/environment'
import bcrypt from 'bcryptjs'
import ApiError from '~/utils/ApiError'
import jwt from 'jsonwebtoken'
import e from 'express'

const getAccount = async (req, res, next) => {
  try {
    const data = await accountService.getAccount(req.query)
    res.status(200).json({
      statusCode : 200,
      data : data.accounts,
      total : data.total,
      limit: data.limit,
      page: data.page
    })
  } catch (error) {
    res.status(404).json({
      statusCode : 404,
      message : error.message || 'Lỗi không xác định'
    })
  }
}

const createAccount = async (req, res, next) => {
  try {
    const account = await accountService.createAccount(req.body)
    res.status(200).json({
      statusCode : 200,
      data : account
    })
  } catch (error) {
    res.status(404).json({
      statusCode : 404,
      message : 'Email đã tồn tại trong hệ thống'
    })
  }
}

const createStaff = async (req, res, next) => {
  try {
    const staff = await accountService.createStaff(req.body)
    res.status(200).json({
      statusCode : 200,
      data : staff
    })
  } catch (error) {
    res.status(404).json({
      statusCode : 404,
      message : 'Email đã tồn tại trong hệ thống'
    })
  }
}

const createManager = async (req, res, next) => {
  try {
    const manager = await accountService.createManager(req.body)
    res.status(200).json({
      statusCode : 200,
      data : manager
    })
  } catch (error) {
    res.status(404).json({
      statusCode : 404,
      message : 'Email đã tồn tại trong hệ thống'
    })
  }
}

const updateAccount = async (req, res, next) => {
  try {
    const { avatar, username, phoneNumber, companyName, address, current_password, new_password } = req.body
    const role = req.user.role
    if (avatar || username || phoneNumber || companyName || address || (current_password && new_password)) {
      if (role === 'admin') {
        if (current_password && new_password) {
          const accountAdmin = await db.Account.findOne({
            where: {
              id: req.user.id
            }
          })

          if (!accountAdmin) {
            return next(new ApiError(403, 'Unauthorized'))
          }

          const match = await bcrypt.compare(current_password, accountAdmin.dataValues.password)

          if (!match) {
            return next(new ApiError(403, 'Mật khẩu cũ không đúng'))
          }

          const hashPassword = await bcrypt.hash(new_password, 10)

          await db.Account.update({ password: hashPassword }, {
            where: {
              id: req.user.id
            }
          })
        }
        if (phoneNumber || avatar || username) {
          const dataUpdate = {}
          if (phoneNumber) dataUpdate.phoneNumber = phoneNumber
          if (avatar) dataUpdate.avatar = avatar
          if (username) dataUpdate.username = username

          await db.Account.update(dataUpdate, {
            where: {
              id: req.user.id
            }
          })
        }
      }

      if (role === 'staff') {
        const id_staff = req.user.id_staff
        if (current_password && new_password) {
          const user = await db.Account.findOne({
            where: {
              id: req.user.id
            }
          })

          if (!user) {
            return next(new ApiError(403, 'Unauthorized'))
          }

          const match = await bcrypt.compare(current_password, user.dataValues.password)

          if (!match) {
            return next(new ApiError(403, 'Mật khẩu cũ không đúng'))
          }

          const hashPassword = await bcrypt.hash(new_password, 10)

          await db.Account.update({ password: hashPassword }, {
            where: {
              id: req.user.id
            }
          })
        }
        if (phoneNumber || avatar || username) {
          const dataUpdate = {}
          if (phoneNumber) dataUpdate.phoneNumber = phoneNumber
          if (avatar) dataUpdate.avatar = avatar
          if (username) dataUpdate.username = username

          await db.Account.update(dataUpdate, {
            where: {
              id: req.user.id
            }
          })
        }
        if (address) {
          await db.Staff.update({ address : address }, {
            where: {
              id: id_staff
            }
          })
        }
      }

      if (role === 'manager') {
        const id_manager = req.user.id_manager
        if (current_password && new_password) {
          const user = await db.Account.findOne({
            where: {
              id: req.user.id
            }
          })

          if (!user) {
            return next(new ApiError(403, 'Unauthorized'))
          }

          const match = await bcrypt.compare(current_password, user.dataValues.password)

          if (!match) {
            return next(new ApiError(403, 'Mật khẩu cũ không đúng'))
          }

          const hashPassword = await bcrypt.hash(new_password, 10)

          await db.Account.update({ password: hashPassword }, {
            where: {
              id: req.user.id
            }
          })
        }
        if (phoneNumber || avatar || username) {
          const dataUpdate = {}
          if (phoneNumber) dataUpdate.phoneNumber = phoneNumber
          if (avatar) dataUpdate.avatar = avatar
          if (username) dataUpdate.username = username

          await db.Account.update(dataUpdate, {
            where: {
              id: req.user.id
            }
          })
        }
        if (companyName) {
          await db.Manager.update({ company_name : companyName }, {
            where: {
              id: id_manager
            }
          })
        }
      }

      const user = await db.Account.findOne({
        where: { id: req.user.id },
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
        ],
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      })

      const token = jwt.sign({
        id : user.dataValues.id,
        email : user.dataValues.email,
        username : user.dataValues.username,
        phoneNumber : user.dataValues.phone_number,
        avatar : user.dataValues.avatar,
        role : user.dataValues.role,
        id_staff : user.dataValues.staffData?.id,
        id_manager : user.dataValues.managerData?.id
      }, env.JWT_SECRETKEY)

      return res.status(200).json({
        statusCode: 200,
        token: token,
        data: {
          id: user.id,
          email: user.email,
          username: user.username,
          phoneNumber: user.phone_number,
          avatar : user.dataValues.avatar,
          role: user.dataValues.role,
          id_staff: user.dataValues.staffData?.id,
          id_manager: user.dataValues.managerData?.id,
          address : user.dataValues.staffData?.address,
          company_name : user.dataValues.managerData?.company_name
        }
      })
    }else {
      res.status(404).json({
        statusCode : 404,
        message : 'Vui lòng nhập thông tin cần cập nhật'
      })
    }

  } catch (error) {
    res.status(404).json({
      statusCode : 404,
      message : 'cập nhật thất bại'
    })
  }
}


const accountController = {
  getAccount,
  createAccount,
  createStaff,
  createManager,
  updateAccount
}

export default accountController
