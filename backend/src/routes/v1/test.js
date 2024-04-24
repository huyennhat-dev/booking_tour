import express from 'express'
import db from '~/models'
import validateToken from '~/middlewares/validationJwt'
import multer from 'multer'
import cloudinary from 'cloudinary'

const cloudinaryV2 = cloudinary.v2
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


cloudinaryV2.config({
  cloud_name: 'huyennhat',
  api_key: '836136537452954',
  api_secret: 'qsXAaQH1f5b5zcLCtXu7-p0NTto'
})


const upload = multer()
const publicId = (imageURL) => {
  return imageURL.split('/').pop().split('.')[0]
}

router.get('/', validateToken, test)
router.post('/', upload.single('file'), async (req, res) => {
  console.log(req.file)
  try {
    await cloudinaryV2.uploader.upload_stream(
      {
        resource_type: 'image', // Loại tệp tin (image, video, raw, ...)
        folder : 'images/booking_tour'
      },
      (error, result) => {
        if (error) {
          return res.status(400).json({
            statusCode: 400,
            message: 'Upload file thất bại'
          })
        } else {
          return res.status(200).json({
            statusCode: 200,
            message: 'Upload file thành công',
            url: result.url
          })
        }
      }
    ).end(req.file.buffer)

  } catch (error) {
    console.log(error)
  }
})
router.delete('/', async (req, res) => {
  try {
    const rs = await cloudinary.uploader.destroy(`images/booking_tour/${publicId(req.body.photo)}`)
    return res.status(200).json({
      statusCode: 200,
      res : rs,
      message: 'Delete file thành công'
    })
  } catch (error) {
    console.log(error)
  }
})


export const testRouter = router
