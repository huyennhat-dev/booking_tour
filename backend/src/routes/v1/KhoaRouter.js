import express from 'express'
import { getAllMonHoc, addMonHoc, editMonHoc, deleteMonHoc, getSV, addSv, deleteSV, editSV, getLop, addLop, editLop, deleteLop , addGV , deleteGV , editGV , getGV , getLtc , addLtc ,deleteLtc , editLtc , addDiem , deleteDiem ,editDiem , getDiem , getDiemById } from '~/controllers/KhoaController'
import addGvValidation from '~/validations/addGvValidation'
import addLopValidation from '~/validations/addLopValidation'
import addLtcValidation from '~/validations/addLtcValidation'
import addMonHocValidation from '~/validations/addMonHocValidation'
import addSvValidation from '~/validations/addSvValidation'
import editGvValidation from '~/validations/editGvValidation'
import editLopValidation from '~/validations/editLopValidation'
import editLtcValidation from '~/validations/editLtcValidation'
import editMonHocValidation from '~/validations/editMonHocValidation'
import editSinhVienValidation from '~/validations/editSinhVienValidation'

const KhoaRouter = express.Router()

KhoaRouter.get('/monhoc', getAllMonHoc)
KhoaRouter.post('/monhoc', addMonHocValidation, addMonHoc)
KhoaRouter.put('/monhoc/:id', editMonHocValidation, editMonHoc)
KhoaRouter.delete('/monhoc/:id', deleteMonHoc)

KhoaRouter.get('/sv', getSV)
KhoaRouter.post('/sv', addSvValidation, addSv)
KhoaRouter.put('/sv/:id', editSinhVienValidation, editSV)
KhoaRouter.delete('/sv/:id', deleteSV)

KhoaRouter.get('/lop', getLop)
KhoaRouter.post('/lop', addLopValidation ,addLop)
KhoaRouter.put('/lop/:id',editLopValidation, editLop)
KhoaRouter.delete('/lop/:id', deleteLop)

KhoaRouter.get('/gv', getGV)
KhoaRouter.post('/gv', addGvValidation, addGV)
KhoaRouter.put('/gv/:id', editGvValidation, editGV)
KhoaRouter.delete('/gv/:id', deleteGV)

KhoaRouter.get('/ltc', getLtc)
KhoaRouter.post('/ltc', addLtcValidation, addLtc)
KhoaRouter.put('/ltc/:id', editLtcValidation, editLtc)
KhoaRouter.delete('/ltc/:id', deleteLtc)

KhoaRouter.get('/diem', getDiem)
KhoaRouter.get('/diem/:id', getDiemById)
KhoaRouter.post('/diem', addDiem)
KhoaRouter.delete('/diem/:id', deleteDiem)


export default KhoaRouter