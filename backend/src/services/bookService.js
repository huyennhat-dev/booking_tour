import db from '~/models'
import { Op, where } from 'sequelize'
import apifeature from '~/helpers/apifeature'
import ApiError from '~/utils/ApiError'
import book from '~/models/book'

const getBook = async (query, role = '', id_by_role) => {
  try {
    // Đọc các tham số từ query string
    const { sortBy = 'createdAt', sortOrder = 'desc' } = query


    // Thực hiện truy vấn
    const booksSucess = await db.Book.findAndCountAll({
      where: {
        isCheckout: true,
        status: 'success'
      },
      include: [
        {
          model: db.Tour,
          as : 'tourData',
          include: [
            {
              model: db.Manager,
              as : 'managerData',
              include: [
                {
                  model: db.Account,
                  as : 'accountData'
                }
              ]
            },
            {
              model: db.Staff,
              as : 'staffData',
              include: [
                {
                  model: db.Account,
                  as : 'accountData'
                }
              ]
            }
          ]
        },
        {
          model: db.User,
          as : 'userData'
        }
      ],
      order: [[sortBy, sortOrder]]
    })

    const booksCancel = await db.Book.findAndCountAll({
      where: {
        isCheckout: true,
        status: 'cancel'
      },
      include: [
        {
          model: db.Tour,
          as : 'tourData',
          include: [
            {
              model: db.Manager,
              as : 'managerData',
              include: [
                {
                  model: db.Account,
                  as : 'accountData'
                }
              ]
            },
            {
              model: db.Staff,
              as : 'staffData',
              include: [
                {
                  model: db.Account,
                  as : 'accountData'
                }
              ]
            }
          ]
        },
        {
          model: db.User,
          as : 'userData'
        },
        {
          model: db.Cancel,
          as : 'cancelData'
        }
      ],
      order: [[sortBy, sortOrder]]
    })

    if (role === 'customer') {
      booksSucess.rows = booksSucess.rows.filter(book => book.id_user === id_by_role)
      booksCancel.rows = booksCancel.rows.filter(book => book.id_user === id_by_role)
    }

    if (role === 'manager') {
      booksSucess.rows = booksSucess.rows.filter(book => book.tourData.id_manager === id_by_role)
      booksCancel.rows = booksCancel.rows.filter(book => book.tourData.id_manager === id_by_role)
    }

    if (role === 'staff') {
      booksSucess.rows = booksSucess.rows.filter(book => book.tourData.id_staff === id_by_role)
      booksCancel.rows = booksCancel.rows.filter(book => book.tourData.id_staff === id_by_role)
    }

    // if (role === 'admin') {
    return {
      'bookSuccess': booksSucess.rows,
      'bookCancel': booksCancel.rows
    }
    // }

    // const customizeBookSucess = booksSucess.rows.map(book => {
    //   let booking_info = {}
    //   try {
    //     booking_info = JSON.parse(book.booking_info)
    //   } catch (error) {
    //     booking_info = {}
    //   }
    //   return {
    //     id : book.id,
    //     booking_info : booking_info,
    //     total_price : book.total_price,
    //     day_booking: book.day_booking,
    //     isCheckout: book.isCheckout,
    //     member : book.member,
    //     tour: {
    //       ...book.tourData.dataValues,
    //     }
    //   }

    // })

    // const customizeBookCancel = booksCancel.rows.map(book => {
    //   let booking_info = {}
    //   try {
    //     booking_info = JSON.parse(book.booking_info)
    //   } catch (error) {
    //     booking_info = {}
    //   }

    //   return {
    //     id : book.id,
    //     booking_info : booking_info,
    //     total_price : book.total_price,
    //     day_booking: book.day_booking,
    //     isCheckout: book.isCheckout,
    //     member : book.member,
    //     tour: {
    //       ...book.tourData.dataValues,
    //     },
    //     cancel: {
    //       ...book.cancelData.dataValues
    //     }
    //   }

    // })


    // return {
    //   'bookSuccess': customizeBookSucess,
    //   'bookCancel': customizeBookCancel
    // }
  } catch (error) {
    console.log(error)
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


const cancelTour = async (idBook, infoCancel) => {
  try {
    const book = await db.Book.findOne({
      where: {
        id: idBook,
        status: 'success'
      }
    })


    if (book) {
      await db.Book.update({
        status: 'cancel'
      }, {
        where: {
          id: idBook
        }
      })

      const newBookCancel = await db.Cancel.create({
        ...infoCancel,
        id_book: idBook,
        is_refund : false
      })

      return newBookCancel
    } else {
      throw new ApiError(.404, 'Không tìm thấy book')
    }
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}

const refundTour = async (idCancel, res) => {
  try {
    console.log(idCancel)
    const cancel = await db.Cancel.findOne({
      where: {
        id: idCancel
      }
    })
    if (cancel.is_refund) {
      throw new ApiError('Đã hoàn tiền rồi')
    }

    if (cancel) {
      await db.Cancel.update({
        is_refund: true
      }, {
        where: {
          id: idCancel
        }
      })

      const book = await db.Book.findOne({
        where: {
          id: cancel.id_book
        }
      })

      if (book) {
        await db.Book.update({
          status: 'cancel'
        }, {
          where: {
            id: cancel.id_book
          }
        })


        const book_member = book.member
        await db.Tour.update({
          total_sale: db.sequelize.literal(`total_sale - ${book_member}`)
        }, {
          where: {
            id: book.id_tour
          }
        })


        return cancel
      } else {
        throw new ApiError('Không tìm thấy book')
      }
    } else {
      throw new ApiError('Không tìm thấy cancel')
    }
  } catch (error) {
    console.log(error)
    throw new ApiError(error.message)
  }
}

const bookService = {
  getBook,
  createBook,
  updateBook,
  deleteBook,
  cancelTour,
  refundTour
}

export default bookService