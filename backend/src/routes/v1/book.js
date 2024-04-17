import express from 'express'
import bookController from '~/controllers/bookController'
import bookValidation from '~/validations/bookValidation'

const router = express.Router()

router.route('/')
  .get(bookController.getBook)
  .post(bookValidation.createBook, bookController.createBook)
  .delete(bookValidation.deleteBook, bookController.deleteBook)
  .put(bookValidation.updateBook, bookController.updateBook)

export const bookRouter = router