import ApiError from '~/utils/ApiError'
import userService from '~/services/userService'


const getUser = async (req, res, next) => {
  // http://localhost:8000/api/v1/user?filters[role]=admin&search=thanh&sortBy=createdAt&sortOrder=desc&page=1&limit=10
  try {
    const users = await userService.getUser(req.query)
    // Trả về kết quả
    return res.status(200).json({
      statusCode: 200,
      data : users.rows
    })
  } catch (error) {

    return next(new ApiError(404, error.message))
  }
}

const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.createUser(req.body)
    return res.status(200).json({
      statusCode : 200,
      message: 'Thêm người dùng thành công',
      data : newUser
    })
  } catch (error) {
    return res.status(404).json({
      statusCode : 404,
      message: `Thêm người dùng thất bại ${error.message}`
    })
  }
}

const updateUser = async (req, res, next) => {
  console.log(req.body)
  try {
    const { id, ...updateData } = req.body
    const updatedUser = await userService.updateUser(id, updateData)
    return res.status(200).json({
      statusCode : 200,
      message: 'Cập nhật người dùng thành công',
      data : updatedUser
    })
  } catch (error) {
    return res.status(404).json({
      statusCode : 404,
      message: `Cập nhật người dùng thất bại hoặc là trường cập nhập không có gì thay đổi ${error.message}`
    })
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body
    const deletedUser = await userService.deleteUser(id)
    return res.status(200).json({
      statusCode : 200,
      message: 'Xóa người dùng thành công',
      data : deletedUser
    })
  } catch (error) {
    return res.status(404).json({
      statusCode : 404,
      message: `Xóa người dùng thất bại ${error.message}`
    })
  }
}

const updateUserById = async (req, res, next) => {}

const userController = {
  getUser,
  createUser,
  updateUser,
  deleteUser
}


export default userController

