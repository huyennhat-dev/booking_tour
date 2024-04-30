import express from 'express'
import bookController from '~/controllers/bookController'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(bookController.getBook)
  .post(bookController.createBook) // tạm xài cái này để tạo tour booking / oke rồi vài vnpay
  .delete(tokenValidation.authToken, bookController.deleteBook)
  .put(tokenValidation.authToken, bookController.updateBook)
  // cái này để update trạng thái booking của tour nếu cancell thì chuyển qua bảng book_cancel
export const bookRouter = router