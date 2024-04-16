import db from '~/models'
import { Op } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'

const getCustomer = async (query) => {
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
          { name_customer: { [Op.like]: `%${search}%` } },
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
    const customers = await db.Customer.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(skip)
    })

    return customers
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const createCustomer = async (body) => {
  try {
    const newCustomer = await apifeature(db.Customer, 'create', { ...body })
    return newCustomer
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const updateCustomer = async (updateData) => {
  try {
    const updatedCustomer = await apifeature(db.Customer, 'update', { ...updateData } , 'id_customer')
    return updatedCustomer
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const deleteCustomer = async (id_customer) => {
  try {
    const deletedCustomer = await apifeature(db.Customer, 'delete', { id_customer } , 'id_customer')
    return deletedCustomer
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const customerService = {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
}

export default customerService