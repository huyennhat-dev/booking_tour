import db from '~/models'
import { Op } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'

const getStaff = async (query) => {
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
          { name_staff: { [Op.like]: `%${search}%` } },
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
    const staffs = await db.Staff.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(skip)
    })

    return staffs
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const createStaff = async (body) => {
  try {
    const newStaff = await apifeature(db.Staff, 'create', { ...body })
    return newStaff
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const updateStaff = async (updateData) => {
  try {
    const updatedStaff = await apifeature(db.Staff, 'update', { ...updateData } , 'id_staff')
    return updatedStaff
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const deleteStaff = async (id_staff) => {
  try {
    const deletedStaff = await apifeature(db.Staff, 'delete', { id_staff } , 'id_staff')
    return deletedStaff
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const staffService = {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff
}

export default staffService