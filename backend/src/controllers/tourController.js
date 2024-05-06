import db from '~/models'
import tourService from '~/services/tourService'
import ApiError from '~/utils/ApiError'

const getTour = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 1000,
      search = ''
    } = req.query

    if (search) {
      // validate search theo định dạng YYYY-MM-DD
      const date = new Date(search)
      if (date.toString() === 'Invalid Date') {
        return next(new ApiError(404, 'Định dạng ngày không hợp lệ'))
      }
    }

    let tours = []

    if (req.user.role === 'admin') {
      tours = await tourService.getTour(req.query)
    }

    else if (req.user.role === 'manager') {
      req.query.filters = {}
      req.query.filters.id_manager = req.user.id_manager
      tours = await tourService.getTour(req.query)
    }

    else if (req.user.role === 'staff') {
      req.query.filters = {}
      req.query.filters.id_staff = req.user.id_staff
      tours = await tourService.getTour(req.query)
    }


    // Trả về kết quả
    return res.status(200).json({
      statusCode: 200,
      page: parseInt(page),
      data: tours.rows,
      limit: parseInt(limit) == 1000 ? null : parseInt(limit),
      total: tours.count
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const getTourDetail = async (req, res, next) => {
  try {
    const id = req.params.id
    const tour = await tourService.getTourDetail(id)
    return res.status(200).json({
      statusCode: 200,
      data: tour
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
    const id = req.params.id
    // check id_tour in table book


    const { ...updateData } = req.body
    updateData.id = id
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
    const id = req.params.id
    const book = await db.Book.findOne({
      where: {
        id_tour: id
      }
    })

    if (book) {
      return res.status(402).json({
        statusCode: 402,
        message: 'Không thể xóa tour đã có người đặt tour'
      })
    }
    const deletedTour = await tourService.deleteTour(id)
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
  deleteTour,
  getTourDetail
}

export default tourController
