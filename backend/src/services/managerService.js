import db from '~/models'
import { Op } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'

const getManager = async (query) => {
  try {
    // Đọc các tham số từ query string
    const { page = 1, limit = 1000, sortBy = 'createdAt', sortOrder = 'desc', search = '', filters = {} } = query

    // Tính skip (bỏ qua) - phần bắt đầu của kết quả phân trang
    const skip = (page - 1) * limit

    // Xây dựng điều kiện tìm kiếm
    let whereClause = {}
    if (search) {
      whereClause = {
        [Op.or]: [
          { name_manager: { [Op.like]: `%${search}%` } },
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
    const managers = await db.Manager.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: db.User,
          as : 'userData',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
        }
      ],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(skip)
    })

    return managers
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const createManager = async (body) => {
  try {
    const newManager = await apifeature(db.Manager, 'create', { ...body })
    return newManager
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const updateManager = async (updateData) => {
  try {
    const updatedManager = await apifeature(db.Manager, 'update', { ...updateData } , 'id_manager')
    return updatedManager
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const deleteManager = async (id_manager) => {
  try {
    const deletedManager = await apifeature(db.Manager, 'delete', { id_manager } , 'id_manager')
    return deletedManager
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const managerService = {
  getManager,
  createManager,
  updateManager,
  deleteManager
}

export default managerService