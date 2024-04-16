import db from '~/models'
import { Op } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'

const getTeam = async (query) => {
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
          { name_team: { [Op.like]: `%${search}%` } },
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
    const teams = await db.Team.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(skip)
    })

    return teams
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const createTeam = async (body) => {
  try {
    const newTeam = await apifeature(db.Team, 'create', { ...body })
    return newTeam
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const updateTeam = async (updateData) => {
  try {
    const updatedTeam = await apifeature(db.Team, 'update', { ...updateData } , 'id_team')
    return updatedTeam
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const deleteTeam = async (id_team) => {
  try {
    const deletedTeam = await apifeature(db.Team, 'delete', { id_team } , 'id_team')
    return deletedTeam
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const teamService = {
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
}

export default teamService