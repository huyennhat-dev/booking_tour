import db from '~/models'
import { Op } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'

const getBook = async (query) => {
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
          { name_book: { [Op.like]: `%${search}%` } }
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
    const books = await db.Book.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(skip)
    })
    return books
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const createBook = async (body) => {
  try {
    const newBook = await apifeature(db.Book, 'create', { ...body })
    return newBook
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const updateBook = async (updateData) => {
  try {
    const updatedBook = await apifeature(db.Book, 'update', { ...updateData }, 'id_booked_tour')
    return updatedBook
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const deleteBook = async (id_booked_tour) => {
  try {
    const deletedBook = await apifeature(db.Book, 'delete', { id_booked_tour }, 'id_booked_tour')
    return deletedBook
  } catch (error) {
    throw new ApiError(error.message)
  }
}

const bookService = {
  getBook,
  createBook,
  updateBook,
  deleteBook
}

export default bookService