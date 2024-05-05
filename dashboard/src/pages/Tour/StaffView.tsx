import { FaBus, FaClock, FaRegBuilding } from 'react-icons/fa';
import BackToPrev from '../../components/BackToPrev';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaLocationDot } from 'react-icons/fa6';
import provinces from '../../assets/js/province';
import vehicle from '../../assets/js/vehicle';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import tourApi from '../../apis/tourApi';
import { formatDate } from '@fullcalendar/core/index.js';


const StaffViewTour = () => {

  const { id } = useParams()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    tourApi.getBookTourDetail(id!).then(rs => {
      const modifyData = {
        ...rs.data,
        tourBookingData: rs.data.tourBookingData?.map((e: any) => {
          return {
            ...e,
            booking_info: JSON.parse(e.booking_info)
          }
        })
      }
      console.log(modifyData)
      setData(modifyData)
    }).catch(err => {
      console.log(err)
    })
  }, [])


  const getName = (slug: string, data: { name: string; slug: string }[]) => {
    const rs = data.find((p) => p.slug === slug);
    return rs ? rs.name : 'Không tìm thấy';
  };



  return (
    <DefaultLayout>
      <BackToPrev />
      <div className="w-full rounded-md bg-white p-2 md:p-6 items-start text-black">
        <h2 className="font-semibold text-xl md:text-2xl">{data?.tour_name}</h2>
        <div className="md:group relative my-2 md:flex justify-between md:px-16 cursor-pointer ">
          <p className="text-md font-normal flex items-center">
            <FaClock className="mr-1" />
            Ngày đi: {data?.departure_day}
          </p>
          <p className="text-md font-normal flex items-center">
            <FaClock className="mr-1" />
            Ngày về: {data?.end_tour_day}
          </p>
          <p className="text-md font-normal flex items-center">
            <FaBus className="mr-1" />
            Phương tiện: {getName(data?.vehicle, vehicle)}
          </p>
          <p className="text-md font-normal flex items-center">
            <FaLocationDot className="mr-1" />
            Địa điểm: {getName(data?.destination, provinces)}
          </p>
          <p className="text-md font-normal flex items-center">
            <FaRegBuilding className="mr-1" />
            Cung cấp bởi: {data?.managerData?.company_name}
          </p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1">
          <div className="px-2 my-7 col-span-1">
            <h3 className="font-semibold text-xl">Hành khách đặt vé</h3>
            <ol className="list-decimal mx-2 md:mx-6 font-medium">
              {data?.tourBookingData?.map((cus: any, index: any) => (
                <li key={index} className="my-2">
                  <div className="flex items-center">
                    <img
                      src={cus.userData?.avatar}
                      className="w-[35px] h-[35px] rounded-full mr-3"
                      alt=""
                    />
                    <p className="mr-4">{cus.userData?.fullName}</p>

                  </div>
                  <div className="pl-12 font-normal text-sm">
                    <p className="font-medium">Thông tin nhận vé:</p>
                    <div className="px-2">
                      <p className="font-medium">
                        Số vé: <span className="font-normal ml-1">{cus?.member}</span>
                      </p>
                      <p className="font-medium">
                        Ngày đặt: <span className="font-normal ml-1">{formatDate(cus?.createdAt)}</span>
                      </p>
                      <p className="font-medium">
                        Tên người nhận:
                        <span className="font-normal ml-1">
                          {cus.booking_info.name}
                        </span>
                      </p>
                      <p className="font-medium">
                        Số điện thoại:
                        <span className="font-normal ml-1">
                          {cus.booking_info.phone_number}
                        </span>
                      </p>
                      <p className="font-medium">
                        Địa chỉ:
                        <span className="font-normal ml-1">
                          {cus.booking_info.address}
                        </span>
                      </p>
                      <p className="font-medium">
                        Lời nhắn:
                        <span className="font-normal ml-1">
                          {cus.booking_info.message}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="px-2 my-7 col-span-2">

            <h3 className="font-semibold text-xl">Điểm nổi bật</h3>
            <div
              className='text-sm font-normal pl-2 my-2'
              dangerouslySetInnerHTML={{ __html: data?.highlight }}
            />
            <h3 className="font-semibold text-xl">Hành trình tour</h3>
            <div
              className='text-sm font-normal pl-2 mt-2'
              dangerouslySetInnerHTML={{ __html: data?.introduce }}
            />
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default StaffViewTour;
