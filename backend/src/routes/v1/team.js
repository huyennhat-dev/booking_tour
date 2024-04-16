import express from 'express'
import teamController from '~/controllers/teamController'

const router = express.Router()

router.route('/')
  .get(teamController.getTeam)
  .post(teamController.createTeam)
  .delete(teamController.deleteTeam)
  .put(teamController.updateTeam)

export const teamRouter = router