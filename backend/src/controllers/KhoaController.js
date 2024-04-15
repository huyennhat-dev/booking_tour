import khoaService from '~/services/khoaService'
import { StatusCodes } from 'http-status-codes'


export const getAllMonHoc = async (req, res, next) => {
  try {
    const result = await khoaService.getAllMonHoc(req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: result.recordset
    })

  } catch (error) {
    next(error)
  }
}

export const addMonHoc = async (req, res, next) => {
  try {
    await khoaService.addMonHoc(req.body, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const editMonHoc = async (req, res, next) => {
  try {
    await khoaService.editMonHoc(req.body, req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const deleteMonHoc = async (req, res, next) => {
  try {
    await khoaService.deleteMonHoc(req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.params.id
    })
  } catch (error) {
    next(error)
  }
}

export const getSV = async (req, res, next) => {
  try {
    const result = await khoaService.getSV(req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: result.recordset
    })

  } catch (error) {
    next(error)
  }
}

export const addSv = async (req, res, next) => {
  try {
    await khoaService.addSv(req.body, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const editSV = async (req, res, next) => {
  try {
    await khoaService.editSV(req.body, req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSV = async (req, res, next) => {
  try {
    console.log(req.params.id)
    await khoaService.deleteSv(req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.params.id
    })
  } catch (error) {
    next(error)
  }
}

export const getLop = async (req, res, next) => {
  try {
    const result = await khoaService.getLop(req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: result.recordset
    })

  } catch (error) {
    next(error)
  }
}

export const addLop = async (req, res, next) => {
  try {
    await khoaService.addLop(req.body, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const editLop = async (req, res, next) => {
  try {
    await khoaService.editLop(req.body, req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const deleteLop = async (req, res, next) => {
  try {
    await khoaService.deleteLop(req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.params.id
    })
  } catch (error) {
    next(error)
  }
}

export const getGV = async (req, res, next) => {
  try {
    const result = await khoaService.getGV(req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: result.recordset
    })

  } catch (error) {
    next(error)
  }
}

export const addGV = async (req, res, next) => {
  try {
    await khoaService.addGV(req.body, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const editGV = async (req, res, next) => {
  try {
    await khoaService.editGV(req.body, req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const deleteGV = async (req, res, next) => {
  try {
    await khoaService.deleteGV(req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.params.id
    })
  } catch (error) {
    next(error)
  }
}

export const addLtc = async (req, res, next) => {
  try {

    console.log(req.body)

    await khoaService.addLtc(req.body, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const getLtc = async (req, res, next) => {
  try {
    const result = await khoaService.getLtc(req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: result.recordset
    })

  } catch (error) {
    next(error)
  }
}

export const editLtc = async (req, res, next) => {
  try {
    await khoaService.editLtc(req.body, req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const deleteLtc = async (req, res, next) => {
  try {
    await khoaService.deleteLtc(req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.params.id
    })
  } catch (error) {
    next(error)
  }
}

export const getDiem = async (req, res, next) => {
  try {
    const result = await khoaService.getDiem(req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: result.recordset
    })

  } catch (error) {
    next(error)
  }
}

export const addDiem = async (req, res, next) => {
  try {
    await khoaService.addDiem(req.body, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const editDiem = async (req, res, next) => {
  try {
    await khoaService.editDiem(req.body, req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.body
    })
  } catch (error) {
    next(error)
  }
}

export const deleteDiem = async (req, res, next) => {
  try {
    await khoaService.deleteDiem(req.params.id, req.query.masv, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: req.params.id
    })
  } catch (error) {
    next(error)
  }
}

export const getDiemById = async (req, res, next) => {
  try {
    const result = await khoaService.getDiemById(req.params.id, req.sql)

    res.status(StatusCodes.OK).json({
      success: true,
      data: result.recordset
    })

  } catch (error) {
    next(error)
  }
}


const KhoaController = {
  getAllMonHoc,
  addMonHoc,
  editMonHoc,
  deleteMonHoc,
  getSV,
  addSv,
  editSV,
  deleteSV,
  getLop,
  addLop,
  editLop,
  deleteLop,
  getGV,
  addGV,
  editGV,
  deleteGV,
  getDiemById
}

export default KhoaController
