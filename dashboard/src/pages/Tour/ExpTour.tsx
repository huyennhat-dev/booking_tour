import { CiEdit, CiTrash } from 'react-icons/ci';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { startTransition, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { TOUR_TYPE } from '../../types';
import { Image, Pagination, Tooltip } from 'antd';
import tourApi from '../../apis/tourApi';
import provinces from '../../assets/js/province';


const ExpListTours = () => {
  const limit = 10;

  const navigate = useNavigate();
  const params = useSearchParams();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(
    parseInt(params[0].get('page') ?? '1'),
  );

  const [tours, setTours] = useState<TOUR_TYPE[]>([]);

  const getAllTour = () => {
    const params = {
      page: currentPage,
      limit: limit,
      exp: 0
    }

    tourApi.getTours(params).then(rs => {
      console.log(rs);
      const modifiedTours = rs.data.map((tour: any) => {
        return {
          ...tour,
          photos: tour.photos?.split(',')
        };
      });
      setTours(modifiedTours);
      setTotal(rs.total);
    })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllTour()
  }, []);

  const handleDeleteTour = (id: number) => {
    console.log(id);
    toast.success('Bạn đã xóa thành công');
  };
  const getProvinceName = (slug: string) => {
    const province = provinces.find(p => p.slug === slug);
    return province ? province.name : "Không tìm thấy tỉnh";
  }
  return (
    <DefaultLayout>
      <ToastContainer autoClose={2000} />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="max-w-[30px] py-4 text-center font-medium text-black dark:text-white ">
                    STT
                  </th>
                  <th className="max-w-[150px] py-4 px-4 text-left font-medium text-black dark:text-white">
                    Hình ảnh
                  </th>
                  <th className="min-w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white">
                    Thông tin
                  </th>
                  <th className=" w-[180px] py-4 px-4 text-center font-medium text-black dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tours.map((data, index) => (
                  <tr key={index}>
                    <td className="border-b text-center border-[#eee] py-5 px-4  dark:border-strokedark ">
                      <p className="text-sm font-bold">{index + 1}</p>
                    </td>
                    <td className="border-b w-[200px] h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark ">
                      <Image.PreviewGroup
                        items={data.photos}
                      >
                        <Image
                          className="w-full h-full rounded object-cover"
                          src={data.photos![0]}
                        />
                      </Image.PreviewGroup>

                    </td>
                    <td className="border-b border-[#eee] text-black py-5 px-4  dark:border-strokedark ">
                      <h4 className="font-semibold text-base line-clamp-2 overflow-visible">
                        {data.tour_name}
                      </h4>
                      <h6 className="text-sm mt-1">
                        <b>Hướng Dẫn Viên:</b> Nguyễn Đức Bảo
                      </h6>
                      <h6 className="text-sm mt-1">
                        <b>Giá ban đầu:</b> {data.initial_price} VND / Người
                      </h6>
                      <h6 className="text-sm mt-1">
                        <b>Điểm đến:</b> {getProvinceName(data.destination)}
                      </h6>
                    </td>

                    <td className="border-b h-[140px] border-[#eee] py-5 px-4  dark:border-strokedark  ">
                      <div className=" flex justify-center">
                        <Tooltip placement="top" title={'Xem chi tiết'}>
                          <button
                            onClick={() =>
                              startTransition(() => {
                                navigate(`/tour/view/${data.id}`);
                              })
                            }
                            className="p-2 mx-1 rounded-full border-[1px] border-orange-600"
                          >
                            <FaRegEye fill="orange" />
                          </button>
                        </Tooltip>
                        <Tooltip placement="top" title={'Chỉnh sửa'}>
                          <button
                            onClick={() =>
                              startTransition(() => {
                                navigate(`/tour/edit/${data.id}`);
                              })
                            }
                            className="p-2 mx-1 rounded-full border-[1px] border-blue-600"
                          >
                            <CiEdit fill="blue" />
                          </button>
                        </Tooltip>
                        <Tooltip placement="top" title={'Xóa'}>
                          <button
                            onClick={() => handleDeleteTour(data.id!)}
                            className="p-2 mx-1 rounded-full border-[1px] border-red-600"
                          >
                            <CiTrash fill="red" />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {total > 10 ? (
            <div className="w-full my-3 text-center">
              <Pagination
                defaultCurrent={currentPage}
                total={total}
                showSizeChanger={false}
                pageSize={limit}
                onChange={(val) => {
                  navigate({ search: `?page=${val}` });
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ExpListTours;
