import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'


const getAllMonHoc = async (sql) => {
  const query = 'SELECT MONHOC.* FROM MONHOC'
  const result = await sql.query(query)
  return result
}

const addMonHoc = async (data , sql) => {
  const query = `
  INSERT MONHOC (MAMH, TENMH, TINCHI, SOTIET_LT, SOTIET_TH, HESO_CC, HESO_BT, HESO_GK, HESO_CK)
  VALUES('${data.MAMH}', '${data.TENMH}', ${data.TINCHI}, ${data.SOTIET_LT}, ${data.SOTIET_TH}, ${data.HESO_CC}, ${data.HESO_BT}, ${data.HESO_GK}, ${data.HESO_CK})
  `

  await sql.query(query)

  return {
    message: 'Thêm thành công'
  }
}

const editMonHoc = async (data, mamh , sql) => {
  console.log(data, mamh)
  const query = `
    UPDATE QL_DIEM_SV.dbo.MONHOC
    SET 
    TENMH='${data.TENMH}', 
    TINCHI=${data.TINCHI}, 
    SOTIET_LT=${data.SOTIET_LT}, 
    SOTIET_TH=${data.SOTIET_TH}, 
    HESO_CC=${data.HESO_CC}, HESO_BT=${data.HESO_BT}, 
    HESO_GK=${data.HESO_GK}, HESO_CK=${data.HESO_CK}
    WHERE MAMH='${mamh}';
  `

  await sql.query(query)

  return {
    message: 'Sửa thành công'
  }
}

const deleteMonHoc = async (mamh , sql) => {
  const query = `
    DELETE FROM QL_DIEM_SV.dbo.MONHOC
    WHERE MAMH='${mamh}';
  `

  await sql.query(query)

  return {
    message: 'Xóa thành công'
  }
}

const getSV = async (sql) => {
  const query = 'SELECT SINHVIEN.MASV , SINHVIEN.HO , SINHVIEN.TEN , SINHVIEN.GIOITINH , SINHVIEN.DIACHI , SINHVIEN.NGAYSINH , SINHVIEN.MALOP , SINHVIEN.THOIHOC , SINHVIEN.EMAIL FROM SINHVIEN'
  const result = await sql.query(query)
  return result
}

const addSv = async (data , sql) => {
  const query = `
    INSERT INTO QL_DIEM_SV.dbo.SINHVIEN
    (MASV, HO, TEN, GIOITINH, DIACHI, NGAYSINH, MALOP, THOIHOC, EMAIL, PASSWORD)
    VALUES('${data.MASV}', '${data.HO}', '${data.TEN}', '${data.GIOITINH}', '${data.DIACHI}', '${data.NGAYSINH}', '${data.MALOP}', 0, '${data.EMAIL}', '${data.PASSWORD}');
  `
  const result = await sql.query(query)

  return result
}

const editSV = async (data, masv , sql) => {
  const query = `
    UPDATE QL_DIEM_SV.dbo.SINHVIEN
    SET 
    HO='${data.HO}', 
    TEN='${data.TEN}', 
    GIOITINH='${data.GIOITINH}', 
    DIACHI='${data.DIACHI}', 
    NGAYSINH='${data.NGAYSINH}', 
    MALOP='${data.MALOP}', 
    EMAIL='${data.EMAIL}', 
    PASSWORD='${data.PASSWORD}'
    WHERE MASV='${masv}';
  `

  await sql.query(query)

  return {
    message: 'Sửa thành công'
  }
}

const deleteSv = async (masv , sql) => {
  const query = `
    DELETE FROM QL_DIEM_SV.dbo.SINHVIEN
    WHERE MASV='${masv}';
  `

  await sql.query(query)

  return {
    message: 'Xóa thành công'
  }
}

const addGV = async (data , sql) => {
  const query = `
    INSERT INTO QL_DIEM_SV.dbo.GIANGVIEN
    (MAGV, MAKHOA , HO, TEN, CHUYENMON, HOCVI, HOCHAM, EMAIL, PASSWORD)
    VALUES('${data.MAGV}', '${data.MAKHOA}' , '${data.HO}', '${data.TEN}', '${data.CHUYENMON}', '${data.HOCVI}', '${data.HOCHAM}', '${data.EMAIL}', '${data.PASSWORD}');
  `
  const result = await sql.query(query)

  return result
}

const getGV = async (sql) => {
  const query = 'SELECT GIANGVIEN.MAGV, GIANGVIEN.MAKHOA , GIANGVIEN.HO , GIANGVIEN.TEN ,  GIANGVIEN.HOCVI , GIANGVIEN.HOCHAM ,GIANGVIEN.CHUYENMON ,GIANGVIEN.EMAIL FROM GIANGVIEN'
  const result = await sql.query(query)
  return result
}

const editGV = async (data, magv , sql) => {
  const query = `
    UPDATE QL_DIEM_SV.dbo.GIANGVIEN
    SET 
    HO='${data.HO}', 
    TEN='${data.TEN}', 
    MAKHOA='${data.MAKHOA}',
    HOCVI='${data.HOCVI}', 
    HOCHAM='${data.HOCHAM}', 
    CHUYENMON='${data.CHUYENMON}',
    EMAIL='${data.EMAIL}', 
    PASSWORD='${data.PASSWORD}'
    WHERE MAGV='${magv}';
  `

  console.log(query)


  await sql.query(query)

  return {
    message: 'Sửa thành công'
  }
}

const deleteGV = async (magv , sql) => {
  const query = `
    DELETE FROM QL_DIEM_SV.dbo.GIANGVIEN
    WHERE MAGV='${magv}';
  `

  await sql.query(query)

  return {
    message: 'Xóa thành công'
  }
}

const getLop = async (sql) => {
  const query = 'SELECT LOP.MALOP , LOP.TENLOP , LOP.KHOAHOC , LOP.MAKHOA FROM LOP'
  const result = await sql.query(query)
  return result
}

const addLop = async (data, sql) => {
  const query = `
    INSERT INTO QL_DIEM_SV.dbo.LOP
    (MALOP, TENLOP, KHOAHOC, MAKHOA)
    VALUES('${data.MALOP}', '${data.TENLOP}', '${data.KHOAHOC}', '${data.MAKHOA}');
  `
  const result = await sql.query(query)

  return result
}

const editLop = async (data, malop , sql) => {
  const query = `
    UPDATE QL_DIEM_SV.dbo.LOP
    SET 
    TENLOP='${data.TENLOP}', 
    KHOAHOC='${data.KHOAHOC}', 
    MAKHOA='${data.MAKHOA}'
    WHERE MALOP='${malop}';
  `

  await sql.query(query)

  return {
    message: 'Sửa thành công'
  }
}

const deleteLop = async (malop, sql) => {
  const query = `
    DELETE FROM QL_DIEM_SV.dbo.LOP
    WHERE MALOP='${malop}';
  `

  await sql.query(query)

  return {
    message: 'Xóa thành công'
  }
}

const getLtc = async (sql) => {
  const query = 'SELECT LOPTINCHI.MALTC , LOPTINCHI.NIENKHOA , LOPTINCHI.HOCKY , LOPTINCHI.MAMH , LOPTINCHI.NHOM , LOPTINCHI.MAGV , GIANGVIEN.TEN , GIANGVIEN.HO , MONHOC.TENMH , LOPTINCHI.MAKHOA, LOPTINCHI.SOSVTOITHIEU, LOPTINCHI.HUYLOP FROM LOPTINCHI , GIANGVIEN , MONHOC WHERE GIANGVIEN.MAGV = LOPTINCHI.MAGV AND MONHOC.MAMH = LOPTINCHI.MAMH'
  const result = await sql.query(query)
  return result
}

const addLtc = async (data, sql) => {
  const query = `
    INSERT INTO QL_DIEM_SV.dbo.LOPTINCHI
    (MALTC, NIENKHOA, HOCKY, MAMH, NHOM, MAGV, MAKHOA, SOSVTOITHIEU, HUYLOP)
    VALUES('${data.MALTC}', '${data.NIENKHOA}', '${data.HOCKY}', '${data.MAMH}', '${data.NHOM}', '${data.MAGV}', '${data.MAKHOA}', '${data.SOSVTOITHIEU}', '0');
  `
  const result = await sql.query(query)

  return result
}

const editLtc = async (data, maltc, sql) => {

  console.log(data, maltc)

  const query = `
    UPDATE QL_DIEM_SV.dbo.LOPTINCHI
    SET 
    NIENKHOA='${data.NIENKHOA}', 
    HOCKY='${data.HOCKY}', 
    MAMH='${data.MAMH}',
    NHOM='${data.NHOM}', 
    MAGV='${data.MAGV}', 
    MAKHOA='${data.MAKHOA}',
    SOSVTOITHIEU='${data.SOSVTOITHIEU}', 
    HUYLOP='0'
    WHERE MALTC='${maltc}';
  `

  await sql.query(query)

  return {
    message: 'Sửa thành công'
  }
}

const deleteLtc = async (maltc, sql) => {
  const query = `
    DELETE FROM QL_DIEM_SV.dbo.LOPTINCHI
    WHERE MALTC='${maltc}';
  `

  await sql.query(query)

  return {
    message: 'Xóa thành công'
  }
}

const getDiem = async (sql) => {
  const query = 'SELECT DIEM.MALTC , DIEM.MASV , DIEM.DEIM_CC , DIEM.DEIM_BT , DIEM.DIEM_GK , DIEM.DIEM_CK , SINHVIEN.TEN , SINHVIEN.HO , SINHVIEN.MALOP   FROM DIEM , SINHVIEN WHERE SINHVIEN.MASV = DIEM.MASV '
  const result = await sql.query(query)
  return result
}

const addDiem = async (data, sql) => {
  const query = `
    INSERT INTO QL_DIEM_SV.dbo.DIEM
    (MALTC, MASV)
    VALUES('${data.MALTC}', '${data.MASV}');
  `
  const result = await sql.query(query)

  return result
}

const getDiemById = async (maltc , sql) => {
  const query = `SELECT DIEM.MALTC , DIEM.MASV , DIEM.DEIM_CC , DIEM.DEIM_BT , DIEM.DIEM_GK , DIEM.DIEM_CK , SINHVIEN.TEN , SINHVIEN.HO , SINHVIEN.MALOP   FROM DIEM , SINHVIEN WHERE SINHVIEN.MASV = DIEM.MASV AND DIEM.MALTC = '${maltc}'`
  const result = await sql.query(query)
  console.log(query)
  return result
}

const deleteDiem = async (maltc, masv, sql) => {
  const query = `
    DELETE FROM QL_DIEM_SV.dbo.DIEM
    WHERE MALTC='${maltc}' AND MASV='${masv}';
  `

  console.log(query)

  await sql.query(query)

  return {
    message: 'Xóa thành công'
  }
}




const khoaService = {
  getAllMonHoc,
  addMonHoc,
  editMonHoc,
  deleteMonHoc,
  getSV,
  addSv,
  editSV,
  deleteSv,
  getGV,
  addGV,
  editGV,
  deleteGV,
  getLop,
  editLop,
  deleteLop,
  addLop,
  getLtc,
  addLtc,
  editLtc,
  deleteLtc,
  getDiem,
  addDiem,
  deleteDiem,
  getDiemById
}

export default khoaService


