import accountService from '~/services/accountService'


const getAccount = async (req, res, next) => {
  try {
    const data = await accountService.getAccount(req.query)
    res.status(200).json({
      statusCode : 200,
      data : data.accounts,
      total : data.total,
      limit: data.limit,
      page: data.page
    })
  } catch (error) {
    res.status(404).json({
      statusCode : 404,
      message : error.message || 'Lỗi không xác định'
    })
  }
}

const createStaff = async (req, res, next) => {
  try {
    const staff = await accountService.createStaff(req.body)
    res.status(200).json({
      statusCode : 200,
      data : staff
    })
  } catch (error) {
    res.status(404).json({
      statusCode : 404,
      message : 'Email đã tồn tại trong hệ thống'
    })
  }
}

const createManager = async (req, res, next) => {
  try {
    const manager = await accountService.createManager(req.body)
    res.status(200).json({
      statusCode : 200,
      data : manager
    })
  } catch (error) {
    res.status(404).json({
      statusCode : 404,
      message : 'Email đã tồn tại trong hệ thống'
    })
  }
}


const accountController = {
  getAccount,
  createStaff,
  createManager
}

export default accountController
