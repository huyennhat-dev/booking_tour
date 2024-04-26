import express from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import env from '~/config/environment'
import tokenValidation from '~/middlewares/jwtMiddleware'

const cloudinaryV2 = cloudinary.v2
const router = express.Router()
const upload = multer()

cloudinaryV2.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET
})


const publicId = (imageURL) => {
  return imageURL.split('/').pop().split('.')[0]
}

router.post('/', tokenValidation.authToken, upload.single('file'), async (req, res) => {
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
router.delete('/', tokenValidation.authToken, async (req, res) => {
  try {
    const rs = await cloudinary.uploader.destroy(`images/booking_tour/${publicId(req.body.photo)}`)
    return res.status(200).json({
      statusCode: 200,
      res : rs,
      message: 'Delete file thành công'
    })
  } catch (error) {
    console.log(error)
    res.status(401).json(error)
  }
})


export const uploadRouter = router
