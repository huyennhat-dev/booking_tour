import db from '~/models'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'

const getStaff = async (query , id_manager) => {
  try {
    // Đọc các tham số từ query string
    const {
      page = 1,
      limit = 1000,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      filters = {}
    } = query

    // Tính skip (bỏ qua) - phần bắt đầu của kết quả phân trang
    const skip = (page - 1) * limit

    // Xây dựng điều kiện tìm kiếm
    let whereClause = {
      id_manager: id_manager
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
      include: [
        {
          model: db.Account,
          as: 'accountData',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
        }
      ],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit) == 1000 ? null : parseInt(limit),
      offset: parseInt(skip)
    })

    return staffs
  } catch (error) {
    console.log(error)
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
    const updatedStaff = await apifeature(db.Staff, 'update', {
      ...updateData
    })
    return updatedStaff
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const deleteStaff = async (id_staff) => {
  try {
    const staff = await db.Staff.findOne({ where: { id: id_staff } })

    const deletedStaff = await apifeature(db.Staff, 'delete', { id: id_staff })

    const deleteStaffAccount = await db.Account.destroy({
      where: { id: staff.id_account }
    })

    return deletedStaff
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const getTourBookingByStaff = async (idStaff, idTour) => {
  try {
    console.log(idStaff)
    console.log(idTour)
    const tour = await db.Tour.findOne({
      where: {
        id_staff: idStaff,
        id: idTour
      },
      include: [
        {
          model: db.Staff,
          as: 'staffData',
          include: [
            {
              model: db.Account,
              as: 'accountData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        },
        {
          model: db.Manager,
          as: 'managerData',
          include: [
            {
              model: db.Account,
              as: 'accountData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        },
        {
          model: db.Book,
          as: 'tourBookingData',
          where: { status: 'success', isCheckOut: true },
          include: [
            {
              model: db.User,
              as: 'userData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            },
            {
              model: db.Cancel,
              as: 'cancelData'
            }
          ]
        }
      ]
    })
    return tour
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}

const staffService = {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getTourBookingByStaff
}

export default staffService
