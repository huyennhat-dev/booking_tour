import express from 'express'
import bookController from '~/controllers/bookController'
import bookValidation from '~/validations/bookValidation'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken, bookController.getBook)
  .post(tokenValidation.authToken, bookValidation.createBook, bookController.createBook)
  .delete(tokenValidation.authToken, bookValidation.deleteBook, bookController.deleteBook)
  .put(tokenValidation.authToken, bookValidation.updateBook, bookController.updateBook)

export const bookRouter = router