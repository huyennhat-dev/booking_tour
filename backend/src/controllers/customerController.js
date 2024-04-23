import customerService from '~/services/customerService'
import ApiError from '~/utils/ApiError'

const getCustomer = async (req, res, next) => {
  try {
    const { page = 1, limit = 1000, sortBy = 'createdAt', sortOrder = 'desc', search = '', filters = {} } = req.query
    const customers = await customerService.getCustomer(req.query)

    // Trả về kết quả
    return res.status(200).json({
      page: parseInt(page),
      totalPages: Math.ceil(customers.count / limit),
      customers: customers.rows
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const createCustomer = async (req, res, next) => {
  try {
    const newCustomer = await customerService.createCustomer(req.body)
    return res.status(200).json({
      statusCode: 200,
      message: 'Thêm customer thành công',
      data: newCustomer
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Thêm customer thất bại ${error.message}`
    })
  }
}

const updateCustomer = async (req, res, next) => {
  try {
    const { ...updateData } = req.body
    const updatedCustomer = await customerService.updateCustomer(updateData)
    return res.status(200).json({
      statusCode: 200,
      message: 'Cập nhật customer thành công',
      data: updatedCustomer
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Cập nhật customer thất bại ${error.message}`
    })
  }
}

const deleteCustomer = async (req, res, next) => {
  try {
    const { id_customer } = req.body
    const deletedCustomer = await customerService.deleteCustomer(id_customer)
    return res.status(200).json({
      statusCode: 200,
      message: 'Xóa customer thành công',
      data: deletedCustomer
    })
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      message: `Xóa customer thất bại ${error.message}`
    })
  }
}

const customerController = {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
}

export default customerController