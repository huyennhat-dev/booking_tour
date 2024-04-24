import db from '~/models'
import { Op } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'

const getTour = async (query) => {
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
          { name_tour: { [Op.like]: `%${search}%` } }
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
    const tours = await db.Tour.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: db.Manager,
          as : 'managerData',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: db.User,
              as : 'userData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        },
        {
          model: db.Staff,
          as : 'staffData',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: db.User,
              as : 'userData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            },
            {
              model: db.Manager,
              as : 'managerData',
              exclude: ['createdAt', 'updatedAt'],
              include: [
                {
                  model: db.User,
                  as : 'userData',
                  attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                }
              ]
            }
          ]
        }
      ],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(skip)
    })

    return tours
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const createTour = async (body) => {
  try {
    const newTour = await apifeature(db.Tour, 'create', { ...body })
    return newTour
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const updateTour = async (updateData) => {
  try {
    const updatedTour = await apifeature(db.Tour, 'update', { ...updateData }, 'id_tour')
    return updatedTour
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const deleteTour = async (id_tour) => {
  try {
    const deletedTour = await apifeature(db.Tour, 'delete', { id_tour }, 'id_tour')
    return deletedTour
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const tourService = {
  getTour,
  createTour,
  updateTour,
  deleteTour
}

export default tourService