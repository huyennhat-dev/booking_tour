import db from '~/models'
import { Op, where } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'
import sendMailWithHtml from './mailService'

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
      include: [
        {
          model: db.Customer,
          as : 'customerData',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: db.User,
              as : 'userData',
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            }
          ]
        },
        {
          model: db.Tour,
          as : 'tourData',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: db.Manager,
              as : 'managerData',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
              include: [
                {
                  model: db.User,
                  as : 'userData',
                  attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                }
              ]
            },
            {
              model: db.Staff,
              as : 'staffData',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
              include: [
                {
                  model: db.User,
                  as : 'userData',
                  attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                },
                {
                  model: db.Manager,
                  as : 'managerData',
                  exclude: ['createdAt', 'updatedAt'],
                  include: [
                    {
                      model: db.User,
                      as : 'userData',
                      attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
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
    // kiểm tra người dùng đã book tour này chưa
    const isBooked = await db.Book.findOne({
      where: {
        id_tour: body.id_tour,
        id_customer: body.id_customer
      }
    })

    if (isBooked == null) {
      const newBook = await apifeature(db.Book, 'create', { ...body })

      // trã về thông tin book
      const book = await db.Book.findOne({
        where: {
          id_booked_tour: newBook.dataValues.id_booked_tour
        },
        include: [
          {
            model: db.Customer,
            as : 'customerData',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
                model: db.User,
                as : 'userData',
                attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
              }
            ]
          },
          {
            model: db.Tour,
            as : 'tourData',
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
                model: db.Manager,
                as : 'managerData',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                  {
                    model: db.User,
                    as : 'userData',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                  }
                ]
              },
              {
                model: db.Staff,
                as : 'staffData',
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                  {
                    model: db.User,
                    as : 'userData',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                  },
                  {
                    model: db.Manager,
                    as : 'managerData',
                    exclude: ['createdAt', 'updatedAt'],
                    include: [
                      {
                        model: db.User,
                        as : 'userData',
                        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      })

      const { customerData, tourData, guest_number } = book.dataValues
      console.log(book)
      // gửi mail xác nhận đặt tour
      console.log(`
        <h2>Đặt tour thành công</h2>
        <p>Xin chào ${customerData.full_name},</p>
        <p>Cảm ơn bạn đã đặt tour "${tourData.name_tour}" tại công ty du lịch ${tourData?.managerData?.company_name}.</p>
        <p>Thông tin chi tiết:</p>
        <ul>
            <li>Tên tour: ${tourData.name_tour}</li>
            <li>Địa điểm: ${tourData.destination}</li>
            <li>Ngày khởi hành: ${tourData.departure}</li>
            <li>Ngày kết thúc: ${tourData.end_tour}</li>
            <li>Số lượng khách: ${guest_number}</li>
        </ul>
        <p>Bạn có thể xem thông tin chi tiết của tour tại <a href="{{tour_link}}">đây</a>.</p>
        <p>Chúng tôi rất mong chờ chuyến đi của bạn!</p>
        <p>Trân trọng,</p>
        <p>${tourData?.managerData?.company_name}</p>
      `, customerData.userData.email)

      return book
    } else {
      throw new ApiError('Bạn đã book tour này rồi')
    }

  } catch (error) {
    console.log(error)
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