import staffService from '~/services/staffService'
import ApiError from '~/utils/ApiError'

const getStaff = async (req, res, next) => {
  try {
    const { page = 1, limit = 1000, sortBy = 'createdAt', sortOrder = 'desc', search = '', filters = {} } = req.query
    const staffs = await staffService.getStaff(req.query)

    // Trả về kết quả
    return res.status(200).json({
      statusCode: 200,
      limit: parseInt(limit),
      page: parseInt(page),
      total: staffs.count,
      data: staffs.rows
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const createStaff = async (req, res, next) => {
  try {
    const newStaff = await staffService.createStaff(req.body)
    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm staff thành công',
      data: newStaff
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Thêm staff thất bại ${error.message}`
    })
  }
}

const updateStaff = async (req, res, next) => {
  try {
    const { ...updateData } = req.body
    const updatedStaff = await staffService.updateStaff(updateData)
    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật staff thành công',
      data: updatedStaff
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Cập nhật staff thất bại ${error.message}`
    })
  }
}

const deleteStaff = async (req, res, next) => {
  try {
    const { id } = req.body

    const deletedStaff = await staffService.deleteStaff(id)
    return res.status(200).json({
      statusCode: 200,
      message: 'Xóa staff thành công',
      data: deletedStaff
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Xóa staff thất bại ${error.message}`
    })
  }
}

const staffController = {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff
}

export default staffController