import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


export const getDiemSinhVien = async (masv , sql) => {
  const query = `
    SELECT
    LOPTINCHI.NIENKHOA ,
    LOPTINCHI.HOCKY ,
    MONHOC.TENMH ,
    MONHOC.TINCHI ,
    DIEM.DEIM_CC   as DIEM_CC,
    DIEM.DEIM_BT  as DIEM_BT,
    DIEM.DIEM_GK as DIEM_GK,
    DIEM.DIEM_CK  as DIEM_CK,
    DIEM.DEIM_CC * MONHOC.HESO_CC + DIEM.DEIM_BT * MONHOC.HESO_BT + DIEM.DIEM_GK * MONHOC.HESO_GK + DIEM.DIEM_CK * MONHOC.HESO_CK as  DIEM_T10
    FROM
    LOPTINCHI , DIEM , MONHOC
    WHERE
    LOPTINCHI.MALTC = DIEM.MALTC AND LOPTINCHI.MAMH = MONHOC.MAMH  AND DIEM.MASV = '${masv}'
  `
  const result = await sql.query(query)

  if (result.recordset.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy sinh viên')
  }

  return result

}


export const getHocPhan = async (masv , sql) => {
  const query = `
    SELECT
    GIANGVIEN.MAGV ,
    GIANGVIEN.HO ,
    GIANGVIEN.TEN ,
    GIANGVIEN.HOCVI ,
    LOPTINCHI.NIENKHOA ,
    LOPTINCHI.HOCKY ,
    MONHOC.TENMH ,
    MONHOC.TINCHI
    FROM
    LOPTINCHI , DIEM , MONHOC , GIANGVIEN
    WHERE GIANGVIEN.MAGV = LOPTINCHI.MAGV AND LOPTINCHI.MALTC = DIEM.MALTC AND LOPTINCHI.MAMH = MONHOC.MAMH  AND DIEM.MASV = '${masv}'
  `
  const result = await sql.query(query)

  if (result.recordset.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy sinh viên')
  }

  return result

}
