import teamService from '~/services/teamService'
import ApiError from '~/utils/ApiError'

const getTeam = async (req, res, next) => {
  try {
    const { page = 1, limit = 1000, sortBy = 'createdAt', sortOrder = 'desc', search = '', filters = {} } = req.query
    const teams = await teamService.getTeam(req.query)

    // Trả về kết quả
    return res.status(200).json({
      page: parseInt(page),
      totalPages: Math.ceil(teams.count / limit),
      teams: teams.rows
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const createTeam = async (req, res, next) => {
  try {
    const newTeam = await teamService.createTeam(req.body)
    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm team thành công',
      data: newTeam
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Thêm team thất bại ${error.message}`
    })
  }
}

const updateTeam = async (req, res, next) => {
  try {
    const { ...updateData } = req.body
    console.log(updateData)
    const updatedTeam = await teamService.updateTeam(updateData)
    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật team thành công',
      data: updatedTeam
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Cập nhật team thất bại ${error.message}`
    })
  }
}

const deleteTeam = async (req, res, next) => {
  try {
    const { id_team } = req.body
    const deletedTeam = await teamService.deleteTeam(id_team)
    return res.status(200).json({
      statusCode: 200,
      message: 'Xóa team thành công',
      data: deletedTeam
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Xóa team thất bại ${error.message}`
    })
  }
}

const teamController = {
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
}

export default teamController