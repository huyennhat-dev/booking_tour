import { sql } from '~/config/sqlserver'

const loginFeature = async (namedatabase, body) => {
  const { email, password } = body
  let query = `select * from ${namedatabase} WHERE ${namedatabase}.EMAIL = '${email}' AND ${namedatabase}.PASSWORD = '${password}'`
  let result = await sql.query(query)
  return result
}

export default loginFeature