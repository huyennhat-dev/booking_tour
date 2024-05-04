import express from 'express'
const cheerio = require('cheerio')
const axios = require('axios')
import apifeature from '~/helpers/apifeature'
import db from '~/models'

const router = express.Router()

const provinces = [
  { name: 'Hà Nội', slug: 'ha-noi' },
  { name: 'Hồ Chí Minh', slug: 'ho-chi-minh' },
  { name: 'Đà Nẵng', slug: 'da-nang' },
  { name: 'Hải Phòng', slug: 'hai-phong' },
  { name: 'Cần Thơ', slug: 'can-tho' },
  { name: 'An Giang', slug: 'an-giang' },
  { name: 'Bà Rịa - Vũng Tàu', slug: 'ba-ria-vung-tau' },
  { name: 'Bạc Liêu', slug: 'bac-lieu' },
  { name: 'Bắc Giang', slug: 'bac-giang' },
  { name: 'Bắc Kạn', slug: 'bac-kan' },
  { name: 'Bắc Ninh', slug: 'bac-ninh' },
  { name: 'Bến Tre', slug: 'ben-tre' },
  { name: 'Bình Dương', slug: 'binh-duong' },
  { name: 'Bình Định', slug: 'binh-dinh' },
  { name: 'Bình Phước', slug: 'binh-phuoc' },
  { name: 'Bình Thuận', slug: 'binh-thuan' },
  { name: 'Cà Mau', slug: 'ca-mau' },
  { name: 'Cao Bằng', slug: 'cao-bang' },
  { name: 'Đắk Lắk', slug: 'dak-lak' },
  { name: 'Đắk Nông', slug: 'dak-nong' },
  { name: 'Điện Biên', slug: 'dien-bien' },
  { name: 'Đồng Nai', slug: 'dong-nai' },
  { name: 'Đồng Tháp', slug: 'dong-thap' },
  { name: 'Gia Lai', slug: 'gia-lai' },
  { name: 'Hà Giang', slug: 'ha-giang' },
  { name: 'Hà Nam', slug: 'ha-nam' },
  { name: 'Hà Tĩnh', slug: 'ha-tinh' },
  { name: 'Hải Dương', slug: 'hai-duong' },
  { name: 'Hậu Giang', slug: 'hau-giang' },
  { name: 'Hòa Bình', slug: 'hoa-binh' },
  { name: 'Hưng Yên', slug: 'hung-yen' },
  { name: 'Khánh Hòa', slug: 'khanh-hoa' },
  { name: 'Kiên Giang', slug: 'kien-giang' },
  { name: 'Kon Tum', slug: 'kon-tum' },
  { name: 'Lai Châu', slug: 'lai-chau' },
  { name: 'Lâm Đồng', slug: 'lam-dong' },
  { name: 'Lạng Sơn', slug: 'lang-son' },
  { name: 'Lào Cai', slug: 'lao-cai' },
  { name: 'Long An', slug: 'long-an' },
  { name: 'Nam Định', slug: 'nam-dinh' },
  { name: 'Nghệ An', slug: 'nghe-an' },
  { name: 'Ninh Bình', slug: 'ninh-binh' },
  { name: 'Ninh Thuận', slug: 'ninh-thuan' },
  { name: 'Phú Thọ', slug: 'phu-tho' },
  { name: 'Quảng Bình', slug: 'quang-binh' },
  { name: 'Quảng Nam', slug: 'quang-nam' },
  { name: 'Quảng Ngãi', slug: 'quang-ngai' },
  { name: 'Quảng Ninh', slug: 'quang-ninh' },
  { name: 'Quảng Trị', slug: 'quang-tri' },
  { name: 'Sóc Trăng', slug: 'soc-trang' },
  { name: 'Sơn La', slug: 'son-la' },
  { name: 'Tây Ninh', slug: 'tay-ninh' },
  { name: 'Thái Bình', slug: 'thai-binh' },
  { name: 'Thái Nguyên', slug: 'thai-nguyen' },
  { name: 'Thanh Hóa', slug: 'thanh-hoa' },
  { name: 'Thừa Thiên Huế', slug: 'thua-thien-hue' },
  { name: 'Tiền Giang', slug: 'tien-giang' },
  { name: 'Trà Vinh', slug: 'tra-vinh' },
  { name: 'Tuyên Quang', slug: 'tuyen-quang' },
  { name: 'Vĩnh Long', slug: 'vinh-long' },
  { name: 'Vĩnh Phúc', slug: 'vinh-phuc' },
  { name: 'Yên Bái', slug: 'yen-bai' }
]

const imgs = [
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-1.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-2.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-3.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-4.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-5.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-6.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-7.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-8.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-9.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-10.jpg',
  'https://viettourist.com//resources/images/680mientay/13tinhmientay-11.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-1.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-2.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-3.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-4.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-5.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-6.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-7.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-8.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-9.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-10.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-11.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-12.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-13.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-14.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-15.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-16.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-17.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-18.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-19.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-21.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-22.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-23.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-24.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-25.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-26.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-27.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-28.jpg',
  'https://viettourist.com//resources/images/DANANG/Danang-2022/banahill-29.jpg'
]

const vehicles = [
  {
    name: 'Taxi',
    slug: 'taxi'
  },
  {
    name: 'Xe bus',
    slug: 'bus'
  },
  {
    name: 'Tàu hỏa',
    slug: 'train'
  },
  {
    name: 'Máy bay',
    slug: 'plane'
  }
]

function randomDateInRange(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const timeRange = end.getTime() - start.getTime()

  const randomTime = start.getTime() + Math.random() * timeRange
  const randomDate = new Date(randomTime)

  const year = randomDate.getFullYear()
  const month = String(randomDate.getMonth() + 1).padStart(2, '0') // Tháng tính từ 0 (tháng 0 là tháng 1)
  const day = String(randomDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function nextWeekDate(previousDate, data) {
  const prev = new Date(previousDate)

  const next = new Date(prev.getTime() + data * 24 * 60 * 60 * 1000)

  const year = next.getFullYear()
  const month = String(next.getMonth() + 1).padStart(2, '0') // Tháng tính từ 0 (tháng 0 là tháng 1)
  const day = String(next.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDecimalInRange(min, max, decimalPlaces) {
  const random = Math.random() * (max - min) + min
  return random.toFixed(decimalPlaces)
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const crwalFunc = async (req, res, next) => {
  try {
    const { url } = req.body
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    const itemUrls = []

    $('.tab-content .list-tour-01 li .title a').each((index, el) => {
      const itemUrl = $(el).attr('href')
      itemUrls.push(itemUrl)
    })

    for (let i = 0; i < itemUrls.length; i++) {
      try {
        const rs = await axios.get(itemUrls[i])
        const $$ = cheerio.load(rs.data)

        const tour_name = $$('.main-page.detail-page .name').text().trim()

        const departure_day = randomDateInRange('2024-05-10', '2024-07-30')
        const end_tour_day = nextWeekDate(departure_day, randomInRange(5, 10))
        const initial_price = parseInt(
          $$('.main-page.detail-page .price .normal-price')
            .first()
            .text()
            .trim()
            .replace(/\D/g, '') || 10000,
          10
        )
        const promotional = parseFloat(randomDecimalInRange(0, 0.3, 2))

        const destination =
          provinces[randomInRange(0, provinces.length - 1)].slug

        const vehicle = vehicles[randomInRange(0, vehicles.length - 1)].slug

        const photos = shuffleArray(imgs).slice(0, randomInRange(3, 5))

        const highlight = $$('.main-page.detail-page .o2 span').html().trim()
        const introduce = $$(
          '.main-page.detail-page #detail-content-sticky-nav-timeline .item .content'
        )
          .html()
          .trim()
        const id_staff = 30
        const id_manager = 9
        const insurance = true
        const meal = true
        const max_user = randomInRange(20, 50)
        const point_rating = randomDecimalInRange(4.0, 5.0, 1)

        const data = {
          tour_name,
          end_tour_day,
          departure_day,
          destination,
          vehicle,
          promotional,
          initial_price,
          photos,
          id_manager,
          id_staff,
          insurance,
          meal,
          max_user,
          point_rating,
          highlight,
          introduce
        }

        const newTour = await apifeature(db.Tour, 'create', {
          ...data,
          photos: data.photos?.join(',')
        })

        if (i == itemUrls.length - 1) return res.json({ status: true })
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    return res.json({ error })
  }
}

router.get('/', crwalFunc)
export const crawlRouter = router
