import express from 'express'
import db from '~/models'


const router = express.Router()


const test = async (req, res, next) => {

  // join 2 bảng tour and id_manager and staff_id
  const tour = await db.Tour.findAll({
    include: [
      {
        model: db.Manager,
        as : 'managerData'
      },
      {
        model: db.Staff,
        as : 'staffData'
      }
    ]
  })

  const book = await db.Book.findAll({
    include: [
      {
        model: db.Customer,
        as : 'customerData',
        include: [
          {
            model: db.User,
            as : 'userData'
          }
        ]
      },
      {
        model: db.Tour,
        as : 'tourData',
        include: [
          {
            model: db.Manager,
            as : 'managerData'
          },
          {
            model: db.Staff,
            as : 'staffData'
          }
        ]
      }
    ]
  })


  return res.status(200).json({
    statusCode : 200,
    message : 'Hello World',
    tour:tour,
    book :  book
  })

}

router.get('/', test)

export const testRouter = router
