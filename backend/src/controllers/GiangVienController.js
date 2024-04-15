import { StatusCodes } from 'http-status-codes'
import { getHocPhan , svbyHocPhan , updateDiem } from '~/services/giangVienService'


export const getHocPhanByGiangVien = async (req, res, next) => {
  try {
    const data = await getHocPhan(req.params.id , req.sql)

    res.status(StatusCodes.OK).json({
      data: data.recordset,
      metadata: data,
      code: StatusCodes.OK
    })

  } catch (error) {
    next(error)
  }
}

export const getSVbyHocPhan = async (req, res, next) => {
  try {
    const data = await svbyHocPhan(req.params.id , req.sql)

    res.status(StatusCodes.OK).json({
      data: data.recordset,
      metadata: data,
      code: StatusCodes.OK
    })

  } catch (error) {
    next(error)
  }
}

export const updateDiemSV = async (req, res, next) => {
  try {
    const data = await updateDiem(req.body , req.sql)

    res.status(StatusCodes.OK).json({
      data: data,
      code: StatusCodes.OK
    })

  } catch (error) {
    next(error)
  }
}
