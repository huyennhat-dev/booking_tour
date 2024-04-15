import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'


export const getHocPhan = async (magv , sql) => {
  const query = `
SELECT 
MONHOC.TENMH , 
LOPTINCHI.NHOM , 
GIANGVIEN.HOCVI,
GIANGVIEN.HOCHAM,
GIANGVIEN.HO ,
GIANGVIEN.TEN ,
LOPTINCHI.MALTC
FROM 
MONHOC , LOPTINCHI , GIANGVIEN 
WHERE
MONHOC.MAMH = LOPTINCHI.MAMH AND GIANGVIEN.MAGV = LOPTINCHI.MAGV AND GIANGVIEN.MAGV = '${magv}'
  `
  const result = await sql.query(query)

  if (result.recordset.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'không tìm thấy học phần')
  }

  return result

}

export const svbyHocPhan = async (malop , sql) => {
  const query = `
    SELECT 
    SINHVIEN.MASV,
    SINHVIEN.HO,
    SINHVIEN.TEN,
    DIEM.DEIM_CC as DIEM_CC,
    DIEM.DEIM_BT as DIEM_BT,
    DIEM.DIEM_GK,
    DIEM.DIEM_CK
    FROM
    SINHVIEN , LOPTINCHI , DIEM
    WHERE
    LOPTINCHI.MALTC = DIEM.MALTC AND DIEM.MASV = SINHVIEN.MASV AND LOPTINCHI.MALTC = '${malop}'
  `
  const result = await sql.query(query)

  if (result.recordset.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'không tìm thấy học phần')
  }

  return result
}

export const updateDiem = async (reqBody , sql) => {
  const query = `
      UPDATE DIEM 
      SET DIEM.DEIM_CC = ${reqBody.DIEM_CC} , DIEM.DEIM_BT = ${reqBody.DIEM_BT} , DIEM.DIEM_GK = ${reqBody.DIEM_GK} , DIEM.DIEM_CK = ${reqBody.DIEM_CK} 
      WHERE DIEM.MALTC = '${reqBody.MALTC}' AND DIEM.MASV = '${reqBody.MASV}';
    `

  const result = await sql.query(query)

  if (result.rowsAffected[0] === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'không tìm thấy sinh viên')
  }

  return reqBody

}