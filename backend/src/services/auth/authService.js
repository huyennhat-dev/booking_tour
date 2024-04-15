import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const login = async (namedatabase, body , sql) => {
  const { email, password } = body
  let query = `select * from ${namedatabase} WHERE ${namedatabase}.EMAIL = '${email}' AND ${namedatabase}.PASSWORD = '${password}'`
  let result = await sql.query(query)
  return result
}


const LoginFeature = async (databaseName, reqBody , sql) => {
  const result = await login(databaseName, reqBody , sql)
  if (result.recordset.length === 1) {
    delete result.recordset[0].PASSWORD
    delete result.recordset[0].rowguid
    return result.recordset[0]
  }
  throw new ApiError(StatusCodes.UNAUTHORIZED, 'Email or password is incorrect')
}

const authService = {
  LoginFeature
}


export default authService