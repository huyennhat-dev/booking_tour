import bookService from '~/services/bookService'
import ApiError from '~/utils/ApiError'

const getBook = async (req, res, next) => {
  try {
    const { page = 1, limit = 1000, sortBy = 'createdAt', sortOrder = 'desc', search = '', filters = {} } = req.query

    const books = await bookService.getBook(req.query)


    // Trả về kết quả
    return res.status(200).json({
      statusCode: 200,
      page: parseInt(page),
      data: books.rows,
      limit : parseInt(limit) == 1000 ? undefined : parseInt(limit)
    })
  } catch (error) {
    console.log(error)
    return next(new ApiError(404, error.message))
  }
}

const createBook = async (req, res, next) => {
  try {
    const newBook = await bookService.createBook(req.body)
    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm book thành công',
      data: newBook
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Thêm book thất bại ${error.message}`
    })
  }
}

const updateBook = async (req, res, next) => {
  try {
    const { ...updateData } = req.body
    const updatedBook = await bookService.updateBook(updateData)
    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật book thành công',
      data: updatedBook
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Cập nhật book thất bại ${error.message}`
    })
  }
}

const deleteBook = async (req, res, next) => {
  try {
    const { id_booked_tour } = req.body
    const deletedBook = await bookService.deleteBook(id_booked_tour)
    return res.status(200).json({
      statusCode: 200,
      message: 'Xóa book thành công',
      data: deletedBook
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Xóa book thất bại ${error.message}`
    })
  }
}

const cancelTour = async (req, res, next) => {
  try {
    const idBook = req.body.id_book
    const infoCancel = req.body
    const canceledTour = await bookService.cancelTour(idBook, infoCancel)
    return res.status(200).json({
      statusCode: 200,
      message: 'Hủy tour thành công',
      data: canceledTour
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Hủy tour thất bại ${error.message}`
    })
  }
}

const refundTour = async (req, res, next) => {
  try {
    const idCancel = req.params.idCancel
    await bookService.refundTour(idCancel, res)
    return res.status(200).json({
      statusCode: 200,
      message: 'Hoàn tiền tour thành công'
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Hoàn tiền tour thất bại ${error.message}`
    })
  }
}

const bookController = {
  getBook,
  createBook,
  updateBook,
  deleteBook,
  cancelTour,
  refundTour
}

export default bookController