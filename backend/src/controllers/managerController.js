import managerService from '~/services/managerService'
import ApiError from '~/utils/ApiError'

const getManager = async (req, res, next) => {
  try {
    const { page = 1, limit = 1000, sortBy = 'createdAt', sortOrder = 'desc', search = '', filters = {} } = req.query
    const managers = await managerService.getManager(req.query)

    // Trả về kết quả
    return res.status(200).json({
      statusCode: 200,
      page: parseInt(page),
      limit: parseInt(limit) == 1000 ? null : parseInt(limit),
      data: managers.rows,
      total: managers.count
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const createManager = async (req, res, next) => {
  try {
    const newManager = await managerService.createManager(req.body)
    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm manager thành công',
      data: newManager
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Thêm manager thất bại ${error.message}`
    })
  }
}

const updateManager = async (req, res, next) => {
  try {
    const { ...updateData } = req.body
    const updatedManager = await managerService.updateManager(updateData)
    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật manager thành công',
      data: updatedManager
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Cập nhật manager thất bại ${error.message}`
    })
  }
}

const deleteManager = async (req, res, next) => {
  try {
    const { id } = req.body
    const deletedManager = await managerService.deleteManager(id)
    return res.status(200).json({
      statusCode: 200,
      message: 'Xóa manager thành công',
      data: deletedManager
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Xóa manager thất bại ${error.message}`
    })
  }
}

const managerController = {
  getManager,
  createManager,
  updateManager,
  deleteManager
}

export default managerController