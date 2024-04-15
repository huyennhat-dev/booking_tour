import { StatusCodes } from 'http-status-codes'
import { getDiemSinhVien, getHocPhan } from '~/services/sinhvienService'

const GetSinhVien = async (req, res, next) => {
  try {
    const result = await req.sql.query`
    select 
    LOP.*,
    SINHVIEN.MASV , 
    SINHVIEN.HO,
    SINHVIEN.TEN,
    SINHVIEN.GIOITINH,
    SINHVIEN.NGAYSINH,
    SINHVIEN.DIACHI
    from LOP INNER JOIN SINHVIEN ON LOP.MALOP = SINHVIEN.MALOP AND SINHVIEN.MASV = ${req.query.masv}`


    res.status(StatusCodes.OK).json({
      data: result.recordset,
      metadata: result,
      code: StatusCodes.OK
    })
  } catch (error) {
    next(error)
  }

}


const GetSinhVienWithHocPhan = async (req, res, next) => {
  try {

    const result = await getHocPhan(req.query.masv , req.sql)


    res.status(StatusCodes.OK).json({
      data: result.recordset,
      metadata: result,
      code: StatusCodes.OK
    })
  } catch (error) {
    next(error)
  }

}


const GetDiemSinhVien = async (req, res, next) => {
  try {
    const result = await getDiemSinhVien(req.params.id , req.sql)
    const hockyVaNamHoc = []
    const object = {}

    result.recordset.map((item) => {
      const { HOCKY, NIENKHOA } = item
      const hockyVaNam = `Học kỳ ${HOCKY} ${NIENKHOA}`
      if (!hockyVaNamHoc.includes(hockyVaNam)) {
        hockyVaNamHoc.push(hockyVaNam)
      }
    })

    hockyVaNamHoc.map((item) => {
      object[item] = []
      result.recordset.map((item2) => {
        const { HOCKY, NIENKHOA } = item2
        const hockyVaNam = `Học kỳ ${HOCKY} ${NIENKHOA}`
        if (item === hockyVaNam) {
          object[item].push(item2)
        }
      })
    })


    res.status(StatusCodes.OK).json({
      hockyVaNamHoc: hockyVaNamHoc,
      data: object
    })
  } catch (error) {
    next(error)
  }


}

const SinhVienController = {
  GetSinhVien,
  GetDiemSinhVien,
  GetSinhVienWithHocPhan
}

export default SinhVienController