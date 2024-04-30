import db from '~/models'
import { Op } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'


const getUser = async (query) => {
  try {
    // Đọc các tham số từ query string
    const { page = 1, limit = 10000, sortBy = 'fullname', sortOrder = 'desc', search = '', filters = {} } =query

    // Tính skip (bỏ qua) - phần bắt đầu của kết quả phân trang
    const skip = (page - 1) * limit

    // Xây dựng điều kiện tìm kiếm
    let whereClause = {}
    if (search) {
      whereClause = {
        [Op.or]: [
          // { username: { [Op.iLike]: `%${search}%` } }
          { email: { [Op.like]: `%${search}%` } }
          // Thêm các trường khác cần tìm kiếm
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
    const users = await db.User.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit) == 1000 ? null : parseInt(limit),
      offset: parseInt(skip),
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    })

    return users
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}

const createUser = async (body) => {
  try {
    if (body.role === 'staff') {
      const newStaff = await apifeature(db.User, 'create', { ...body, password: '$2a$10$f4oQXfQttqYVCVcPhe/mXO1sDH8YTRiMTZDFtBiI/wg5jXkFbpaGy' })
      await apifeature(db.Staff, 'create', { id_manager: body.id_manager, full_name: body.username })

      return db.User.findOne({
        where: { id: newStaff.id },
        include: [
          { model: db.Staff, as: 'staffData', attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } }
        ],
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      })
    }
    if (body.role === 'manager') {
      const newManager = await apifeature(db.User, 'create', { ...body, password: '$2a$10$f4oQXfQttqYVCVcPhe/mXO1sDH8YTRiMTZDFtBiI/wg5jXkFbpaGy' })
      await apifeature(
        db.Manager,
        'create',
        { id_manager: newManager.id, full_name: body.username, company_name: body.company_name })

      return db.User.findOne({
        where: { id: newManager.id },
        include: [
          { model: db.Manager, as: 'managerData', attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } }
        ],
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      })
    }
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const updateUser = async (id, updateData) => {
  try {
    const updatedUser = await apifeature(db.User, 'update', { id, ...updateData })
    return updatedUser
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const deleteUser = async (id) => {
  try {
    const deletedUser = await apifeature(db.User, 'delete', { id })
    return deletedUser
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const userService = {
  getUser,
  createUser,
  updateUser,
  deleteUser
}


export default userService

