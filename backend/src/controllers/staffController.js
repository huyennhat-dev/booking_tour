import staffService from '~/services/staffService'
import ApiError from '~/utils/ApiError'

const getStaff = async (req, res, next) => {
  try {
    const { page = 1, limit = 1000, sortBy = 'createdAt', sortOrder = 'desc', search = '', filters = {} } = req.query
    const id_manager = req.user.id_manager
    const staffs = await staffService.getStaff(req.query , id_manager)

    // Trả về kết quả
    return res.status(200).json({
      statusCode: 200,
      limit: parseInt(limit) == 1000 ? null : parseInt(limit),
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

const getTourBooking = async (req, res, next) => {
  try {
    const staffId = req.user.id_staff
    const { idTour } = req.params
    console.log(idTour)
    const tourBooking = await staffService.getTourBookingByStaff(staffId, idTour)

    // Trả về kết quả
    return res.status(200).json({
      statusCode: 200,
      data: tourBooking
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }

}


const staffController = {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getTourBooking
}

export default staffController