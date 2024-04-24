import express from 'express'
import db from '~/models'
import validateToken from '~/middlewares/validationJwt'
import e from 'express'


const router = express.Router()


const test = async (req, res, next) => {

  // join 2 bảng tour and id_manager and staff_id
  const tour = await db.Tour.findAll({
    include: [
      {
        model: db.Manager,
        as : 'managerData',
        include: [
          {
            model: db.User,
            as : 'userData'
          }
        ]
      },
      {
        model: db.Staff,
        as : 'staffData',
        include: [
          {
            model: db.User,
            as : 'userData'
          }
        ]
      }
    ]
  })

  const book = await db.Book.findAll({

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
                attributes: { exclude: ['createdAt', 'updatedAt'] }
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
                attributes: { exclude: ['createdAt', 'updatedAt'] }
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


  return res.status(200).json({
    statusCode : 200,
    message : 'Hello World',
    tour:tour,
    book :  book
  })

}

router.get('/', validateToken, test)

export const testRouter = router
