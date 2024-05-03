import db from '~/models'
import { Op } from 'sequelize'
import ApiError from '~/utils/ApiError'
import emailService from '~/services/mailService'
import bcrypt from 'bcryptjs'
import generateStrongPassword from '~/utils/generateStrongPassword'

const getAccount = async (query) => {
  try {
    // Đọc các tham số từ query string
    //http://localhost:8000/api/v1/user?filters[role]=admin&search=thanh&sortBy=createdAt&sortOrder=desc&page=1&limit=10
    const { page = 1, limit = 1000, sortBy = 'createdAt', sortOrder = 'desc', search = '', filters = {} } = query

    // Tính skip (bỏ qua) - phần bắt đầu của kết quả phân trang
    const skip = (page - 1) * limit

    // Xây dựng điều kiện tìm kiếm
    let whereClause = {}
    if (search) {
      whereClause = {
        [Op.or]: [
          { email: { [Op.like]: `%${search}%` } }
        ]
      }
    }

    // Áp dụng bộ lọc (nếu có)
    for (const key in filters) {
      // eslint-disable-next-line no-prototype-builtins
      if (filters.hasOwnProperty(key)) {
        whereClause[key] = filters[key]
      }
    }

    // Thực hiện truy vấn
    const accounts = await db.Account.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
      include: [
        {
          model: db.Manager,
          as: 'managerData',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
        },
        {
          model: db.Staff,
          as: 'staffData',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
        }
      ],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit) == 1000 ? null : parseInt(limit),
      offset: parseInt(skip)
    })


    return {
      accounts : accounts.rows,
      total : accounts.count,
      limit : parseInt(limit) == 1000 ? undefined : parseInt(limit),
      page : parseInt(page)
    }
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const createAccount = async (body) => {
  try {
    const { email, username, role, phoneNumber, birthday = '', address = '' } = body
    // check account account
    const checkAccount = await db.Account.findOne({
      where: { email }
    }) // tìm kiếm email trong bảng account


    if (checkAccount) {
      console.log(checkAccount)
      throw new ApiError(404, 'Email đã tồn tại trong hệ thống')
    }

    const strongPassword = 'H123dg#cbhdo@'

    // create account account
    const hashedPassword = await bcrypt.hash(strongPassword, 10)

    const account = await db.Account.create({
      email,
      password : hashedPassword,
      role,
      username,
      phoneNumber
    })
    let account_info

    if (role=='staff') {
      account_info = await db.Staff.create({
        id_account: account.dataValues.id,
        birthday,
        address
      })
    }
    if (role=='manager') {
      account_info = await db.Manager.create({
        id_account: account.dataValues.id,
        birthday,
        address
      })
    }

    try {
      await emailService.sendMailWithPassword(email, strongPassword)
    } catch (error) {
      return account_info
    }
    return account_info
    // Hash the password
  } catch (error) {
    console.error(error)
    throw new ApiError(error.message)
  }
}

const createStaff = async (body) => {
  try {
    const { email, username, phoneNumber = '', birthday = '', address = '' } = body
    // check staff account
    const checkStaffAccount = await db.Account.findOne({
      where: { email }
    }) // tìm kiếm email trong bảng staff


    if (checkStaffAccount) {
      console.log(checkStaffAccount)
      throw new ApiError(404, 'Email đã tồn tại trong hệ thống')
    }

    // create staff account
    const hashedPassword = await bcrypt.hash('123123123', 10)
    const staffAccout = await db.Account.create({
      email,
      password : hashedPassword,
      role : 'staff',
      username,
      phoneNumber
    })

    const staff = await db.Staff.create({
      id_account: staffAccout.dataValues.id,
      birthday,
      address
    })
    try {
      await emailService.sendMailWithPassword(email, '123123123')
    } catch (error) {
      return staff
    }
    return staff
    // Hash the password
  } catch (error) {
    console.error(error)
    throw new ApiError(error.message)
  }
}

const createManager = async (body) => {
  try {
    const { email, username, phoneNumber = '', company_name = '' } = body
    // check manager account
    const checkManagerAccount = await db.Account.findOne({
      where: { email }
    }) // tìm kiếm email trong bảng manager


    if (checkManagerAccount) {
      throw new ApiError(404, 'Email đã tồn tại trong hệ thống')
    }

    // create manager account
    const hashedPassword = await bcrypt.hash('123123123', 10)
    const managerAccount = await db.Account.create({
      email,
      password : hashedPassword,
      role : 'manager',
      username,
      phoneNumber
    })

    const manager = await db.Manager.create({
      id_account: managerAccount.dataValues.id,
      birthday : '',
      company_name
    })

    await emailService.sendMailWithPassword(email, '123123123')
    return manager
    // Hash the password
  } catch (error) {
    console.error(error)
    throw new ApiError(error.message)
  }
}

const accountService = {
  getAccount,
  createStaff,
  createManager,
  createAccount
}


export default accountService