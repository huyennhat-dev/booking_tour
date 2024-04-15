import express from 'express'
import SinhVienController from '~/controllers/SinhVienContrller'
import getSinhVienValidation from '~/validations/getSinhVienValidation'


const SinhVienRouter = express.Router()

SinhVienRouter.route('/')
  .get(getSinhVienValidation, SinhVienController.GetSinhVien)
  
SinhVienRouter.route('/hoc-ky') // chưa tích hợp bên front end
  .get(getSinhVienValidation , SinhVienController.GetSinhVienWithHocPhan)

SinhVienRouter.route('/:id')
  .get( SinhVienController.GetDiemSinhVien)

export default SinhVienRouter