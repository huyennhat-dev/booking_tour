import express from 'express'
import teamController from '~/controllers/teamController'
import teamValidation from '~/validations/teamValidation'

const router = express.Router()

router.route('/')
  .get(teamController.getTeam)
  .post(teamValidation.createTeam, teamController.createTeam)
  .delete(teamValidation.deleteTeam, teamController.deleteTeam)
  .put(teamValidation.updateTeam, teamController.updateTeam)

export const teamRouter = router