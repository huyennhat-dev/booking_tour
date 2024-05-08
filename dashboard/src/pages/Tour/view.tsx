import { useEffect, useState } from 'react';
import BackToPrev from '../../components/BackToPrev';
import DefaultLayout from '../../layout/DefaultLayout';
import { useParams } from 'react-router-dom';
import tourApi from '../../apis/tourApi';
import vehicle from '../../assets/js/vehicle';
import provinces from '../../assets/js/province';
import { formatDate } from '@fullcalendar/core/index.js';

const ImageSection = ({ images }: { images: string[] }) => {
  if (images?.length == 1)
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:grid-rows-2 gap-x-2 h-[500px]">
        <div className="row-span-2 col-span-12">
          <img
            src={images[0]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
      </div>
    );
  if (images?.length == 2)
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:grid-rows-2 gap-x-2 h-[500px]">
        <div className="row-span-2 col-span-6">
          <img
            src={images[0]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
        <div className="row-span-2 col-span-6">
          <img
            src={images[1]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
      </div>
    );
  if (images?.length == 3)
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:grid-rows-2 gap-x-2 h-[500px]">
        <div className="row-span-2 col-span-7">
          <img
            src={images[0]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
        <div className="row-span-2 col-span-5 flex flex-col gap-y-2">
          <div className="grid grid-cols-1 grid-rows-2 gap-y-2">
            <div className="w-full row-span-1 col-span-5">
              <img
                src={images[1]}
                alt=""
                className="rounded-lg object-cover w-full mt-2 md:mt-0 h-[246px]"
              />
            </div>
            <div className="row-span-1 col-span-5 flex gap-2 h-[246px]">
              <div className=" col-span-2 w-full">
                <img
                  src={images[2]}
                  alt=""
                  className="rounded-lg object-cover w-full h-[246px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (images?.length >= 4)
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:grid-rows-2 gap-x-2 h-[500px]">
        <div className="row-span-2 col-span-7">
          <img
            src={images[0]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
        <div className="row-span-2 col-span-5 flex flex-col gap-y-2">
          <div className="grid grid-cols-1 grid-rows-2 gap-y-2">
            <div className="w-full row-span-1 col-span-5">
              <img
                src={images[1]}
                alt=""
                className="rounded-lg object-cover w-full mt-2 md:mt-0 h-[246px]"
              />
            </div>
            <div className="row-span-1 col-span-5 flex gap-2 h-[246px]">
              <div className=" col-span-2 w-full">
                <img
                  src={images[2]}
                  alt=""
                  className="rounded-lg object-cover w-full h-[246px]"
                />
              </div>
              <div className=" col-span-2 w-full">
                <img
                  src={images[3]}
                  alt=""
                  className="rounded-lg object-cover w-full h-[246px] "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

const ViewTour = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<any>();
  useEffect(() => {
    tourApi
      .getTour(id!)
      .then((rs) => {
        const data = rs.data;
        data.photos = rs.data?.photos?.split(',');
        setTour(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const getSlugName = (slug: string, data: any) => {
    const rs = data.find((p: any) => p.slug === slug);
    return rs ? rs.name : 'Không tìm thấy tỉnh';
  };

  const formatCurrencyVND = (amount: number, currencySymbol = 'vnđ') => {
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });
  };

  return (
    <DefaultLayout>
      <BackToPrev />
      <div className="w-full rounded-md bg-white p-6  md:px-6 text-black">
        <h1 className="font-semibold text-2xl w-full">{tour?.tour_name}</h1>
        <div className="w-full flex items-center justify-between my-2 px-2">
          <p>Phương tiện: {getSlugName(tour?.vehicle, vehicle)}</p>
          <p>Địa điểm: {getSlugName(tour?.destination, provinces)}</p>
          <p>Ngày đi: {formatDate(tour?.departure_day)}</p>
          <p>Ngày về: {formatDate(tour?.end_tour_day)}</p>
        </div>
        <ImageSection images={tour?.photos} />

        <div className="grid grid-cols-3 my-6 gap-2">
          <div className="">
            <h2 className="font-semibold text-2xl mb-2">Thông tin tour</h2>
            <p className="w-full flex justify-between px-2">
              <span>Thuộc công ty:</span>
              <span>{tour?.managerData?.company_name}</span>
            </p>
            <p className="w-full flex justify-between px-2">
              <span>Hướng dẫn viên:</span>
              <span>{tour?.staffData?.accountData?.username}</span>
            </p>
            <p className="w-full flex justify-between px-2">
              <span>Giá cả / vé:</span>
               <span>{formatCurrencyVND(tour?.initial_price||0)}</span>
            </p>
            <p className="w-full flex justify-between px-2">
              <span>Giảm giá:</span>
              <span> {(tour?.promotional * 100).toFixed(0)} %</span>
            </p>
     
            <p className="w-full flex justify-between px-2">
              <span>Tổng vé:</span> <span>{tour?.max_user} vé</span>
            </p>
            <p className="w-full flex justify-between px-2">
              <span>Tổng vé bán ra:</span> <span>{tour?.total_sale} vé</span>
            </p>
          </div>
          <div className="col-span-2 ">
            <div>
              <h2 className="font-semibold text-2xl">Điểm nổi bật</h2>
              <div
                className={` text-sm font-normal px-3`}
                dangerouslySetInnerHTML={{ __html: tour?.highlight }}
              />
            </div>
            <div>
              <h2 className="font-semibold text-2xl">Tổng quan tour</h2>
              <div
                className={` text-sm font-normal px-3`}
                dangerouslySetInnerHTML={{ __html: tour?.introduce }}
              />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewTour;
