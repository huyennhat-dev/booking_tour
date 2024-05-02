import ApiError from '~/utils/ApiError'
const getTourHomePage = async (req, res, next) => {
  try {


    // Trả về kết quả
    return res.status(200).json({
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}

const getTourFilter = async (req, res, next) => {
  try {

    return res.status(200).json({
    })
  } catch (error) {
    return next(new ApiError(404, error.message))
  }
}


const homeTourController = {
  getTourHomePage,
  getTourFilter
}

export default homeTourController

