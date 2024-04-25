import tourService from '~/services/tourService'
import ApiError from '~/utils/ApiError'

const getTour = async (req, res, next) => {
  try {
    const { page = 1, limit = 1000, sortBy = 'createdAt', sortOrder = 'desc', search = '', filters = {} } = req.query
    const tours = await tourService.getTour(req.query)

    // Trả về kết quả
    return res.status(200).json({
      page: parseInt(page),
      totalPages: Math.ceil(tours.count / limit),
      tours: tours.rows
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const createTour = async (req, res, next) => {
  try {
    const newTour = await tourService.createTour(req.body)
    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm tour thành công',
      data: newTour
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Thêm tour thất bại ${error.message}`
    })
  }
}

const updateTour = async (req, res, next) => {
  try {
    const { ...updateData } = req.body
    const updatedTour = await tourService.updateTour(updateData)
    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật tour thành công',
      data: updatedTour
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Cập nhật tour thất bại ${error.message}`
    })
  }
}

const deleteTour = async (req, res, next) => {
  try {
    const { id_tour } = req.body
    const deletedTour = await tourService.deleteTour(id_tour)
    return res.status(200).json({
      statusCode: 200,
      message: 'Xóa tour thành công',
      data: deletedTour
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Xóa tour thất bại ${error.message}`
    })
  }
}

const tourController = {
  getTour,
  createTour,
  updateTour,
  deleteTour
}

export default tourController