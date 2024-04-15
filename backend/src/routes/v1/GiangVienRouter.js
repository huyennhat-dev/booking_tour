import express from 'express'
import { getHocPhanByGiangVien, getSVbyHocPhan, updateDiemSV } from '~/controllers/GiangVienController'
import editDiemValidation from '~/validations/editDiemValidation'
import { StatusCodes } from 'http-status-codes'

const GiangVienRouter = express.Router()


GiangVienRouter.get('/get-hoc-phan/:id', getHocPhanByGiangVien)
GiangVienRouter.get('/get-sv-by-hoc-phan/:id', getSVbyHocPhan)
GiangVienRouter.post('/update-diem-sv/', editDiemValidation, updateDiemSV)


GiangVienRouter.get('/get-ten-hoc-phan/:maltc', async (req, res) => {
  const { maltc } = req.params
  const result = await req.sql.query(`
    SELECT MALTC , NIENKHOA , HOCKY , MAKHOA , SOSVTOITHIEU , TENMH , TINCHI , SOTIET_LT , SOTIET_TH , HESO_CC , HESO_BT , HESO_GK , HESO_CK
    FROM LOPTINCHI
    INNER JOIN MONHOC ON MONHOC.MAMH = LOPTINCHI.MAMH
    WHERE LOPTINCHI.MALTC = '${maltc}'
  `)
  res.status(StatusCodes.OK).json({
    data: result.recordset,
    metadata: result,
    code: StatusCodes.OK
  })
})


export default GiangVienRouter