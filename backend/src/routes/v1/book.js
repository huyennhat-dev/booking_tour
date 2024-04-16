import express from 'express'
import bookController from '~/controllers/bookController'

const router = express.Router()

router.route('/')
  .get(bookController.getBook)
  .post(bookController.createBook)
  .delete(bookController.deleteBook)
  .put(bookController.updateBook)

export const bookRouter = router