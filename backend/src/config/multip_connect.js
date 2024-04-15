// pool-manager.js
import env from './environment'
const mssql = require('mssql')
const pools = new Map()

const sqlConfig_main = {
  user: env.USERNAME_DB,
  password: env.PASSWORD,
  database: env.DATABASENAME,
  server: env.SERVER_NAME,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

const sqlConfig_khmt = {
  user: env.USERNAME_DB,
  password: env.PASSWORD,
  database: 'QL_DIEM_SV',
  server: 'BAO\\BAO',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

const sqlConfig_kts = {
  user: env.USERNAME_DB,
  password: env.PASSWORD,
  database: 'QL_DIEM_SV',
  server: 'BAO\\BAO2',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

module.exports = {
  get: (name) => {
    if (!pools.has(name)) {
      const pool = new mssql.ConnectionPool(sqlConfig_main)
      const close = pool.close.bind(pool)
      pool.close = (...args) => {
        pools.delete(name)
        return close(...args)
      }
      pools.set(name, pool.connect())
    }
    return pools.get(name)
  },
  get_khmt: (name) => {
    if (!pools.has(name)) {
      const pool = new mssql.ConnectionPool(sqlConfig_khmt)
      const close = pool.close.bind(pool)
      pool.close = (...args) => {
        pools.delete(name)
        return close(...args)
      }
      pools.set(name, pool.connect())
    }
    return pools.get(name)
  },
  get_kts: (name) => {
    if (!pools.has(name)) {
      const pool = new mssql.ConnectionPool(sqlConfig_kts)
      const close = pool.close.bind(pool)
      pool.close = (...args) => {
        pools.delete(name)
        return close(...args)
      }
      pools.set(name, pool.connect())
    }
    return pools.get(name)
  },
  closeAll: () => Promise.all(Array.from(pools.values()).map((connect) => {
    return connect.then((pool) => pool.close())
  }))
}

