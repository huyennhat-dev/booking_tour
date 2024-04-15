import express from 'express'
import SinhVienRouter from '~/routes/v1/SinhVienRouter'
import GiaoVienAuthRouter from '~/routes/v1/auth/GiaoVienAuthRouter'
import KhoaAuthRouter from '~/routes/v1/auth/KhoaAuthRouter'
import SinhVienAuthRouter from '~/routes/v1/auth/SinhVienAuthRouter'
import GiangVienRouter from '~/routes/v1/GiangVienRouter'
import KhoaRouter from '~/routes/v1/KhoaRouter'

const API_V1 = express.Router()



API_V1.use('/khoa', KhoaRouter)
API_V1.use('/sinhvien', SinhVienRouter)
API_V1.use('/giangvien', GiangVienRouter)


API_V1.use('/auth/gv', GiaoVienAuthRouter)
API_V1.use('/auth/sv', SinhVienAuthRouter)
API_V1.use('/auth/khoa', KhoaAuthRouter)


export default API_V1
