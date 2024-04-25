import express from 'express'
import teamController from '~/controllers/teamController'
import teamValidation from '~/validations/teamValidation'
import tokenValidation from '~/middlewares/jwtMiddleware'

const router = express.Router()

router.route('/')
  .get(tokenValidation.authToken, teamController.getTeam)
  .post(tokenValidation.authToken, teamValidation.createTeam, teamController.createTeam)
  .delete(tokenValidation.authToken, teamValidation.deleteTeam, teamController.deleteTeam)
  .put(tokenValidation.authToken, teamValidation.updateTeam, teamController.updateTeam)

export const teamRouter = router