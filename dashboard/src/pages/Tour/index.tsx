import { CiEdit, CiTrash } from 'react-icons/ci';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { startTransition, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { TOUR_TYPE } from '../../types';
import { Pagination, Tooltip } from 'antd';

const mockData = {
  data: [
    {
      id: 1,
      tour_name:
        'Tour Du lịch Campuchia từ TP.HCM 4 ngày 3 đêm – Khám phá dấu ấn thời gian qua các công trình cổ',
      initial_price: 100,
      departure_day: '2024-05-01',
      end_tour_day: '2024-05-10',
      promotional: 10,
      destination: 'Hà Nội',
      vehicle: 'Máy Bay',
      photos: ['photo1.jpghttps://i.ibb.co/cYDrVGh/Rectangle-245.png', 'https://i.ibb.co/cYDrVGh/Rectangle-245.png', 'https://i.ibb.co/cYDrVGh/Rectangle-245.png'],
      highlight: `
          <p><strong>Các điểm đến nổi tiếng tại Campuchia</strong></p>
          <ul>
              <li><strong>Đền Angkor Wat:</strong> Được coi là một trong những di sản văn hóa thế giới, đền Angkor Wat là điểm dừng chân không thể bỏ qua khi du lịch Campuchia. Khám phá kiến trúc hoành tráng và lịch sử huy hoàng của đền thánh này.</li>
              <li><strong>Phố cổ Siem Reap:</strong> Thành phố nổi tiếng với kiến trúc cổ điển và không khí yên bình, Phố cổ Siem Reap là điểm dừng chân lý tưởng để tận hưởng những ngày thư giãn.</li>
              <li><strong>Thành phố Phnom Penh:</strong> Là thủ đô và trung tâm văn hóa, kinh tế của Campuchia, Phnom Penh không chỉ thu hút du khách bởi các công trình kiến trúc độc đáo mà còn là nơi lưu giữ nhiều di tích lịch sử và văn hóa đặc sắc.</li>
          </ul>
      `,
      id_manager: 1, // ID của người quản lý tour
      id_staff: 2, // ID của nhân viên phụ trách tour
      insurance: true,
      introduce: `
      <p>
          Tour du lịch Campuchia từ TP.HCM 4 ngày 3 đêm sẽ đưa du khách khám phá những điểm đến nổi tiếng và thú vị của Campuchia. Trải nghiệm du lịch độc đáo, thưởng thức những món ăn đặc sản, tham quan những điểm du lịch nổi tiếng và tận hưởng những khoảnh khắc đáng nhớ cùng bạn bè và người thân.
      </p>
      <p>
          Ngày đầu tiên của chuyến đi, du khách sẽ được tham quan Đền Angkor Wat, một trong những kỳ quan của thế giới cổ đại. Sau đó, dừng chân tại phố cổ Siem Reap, nơi bạn có thể thưởng thức những món ăn đặc sản và mua sắm hàng hóa thủ công.
      </p>
      <p>
          Trong những ngày tiếp theo, chúng ta sẽ thăm quan các điểm du lịch khác nhau, như khu phố cổ Angkor Thom, Bảo tàng Quốc gia Campuchia, và tham quan thành phố thủ đô Phnom Penh với nhiều di tích lịch sử và văn hóa đặc sắc.
      </p>
      <p>
          Cuối cùng, chúng ta sẽ kết thúc chuyến đi tuyệt vời này với nhiều kỷ niệm đẹp và những câu chuyện đáng nhớ về Campuchia.
      </p>
      <p>
          Hãy tham gia cùng chúng tôi để khám phá vẻ đẹp và sự hấp dẫn của đất nước Campuchia!
      </p>
  `,

      max_user: 10, // Số lượng người tối đa cho mỗi tour
      meal: true, // Có bao gồm bữa ăn trong tour không
      point_rating: 5, // Điểm đánh giá của tour
    },
  ],
  total: 100,
};

const ListTours = () => {
  const limit = 10;

  const navigate = useNavigate();
  const params = useSearchParams();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(
    parseInt(params[0].get('page') ?? '1'),
  );

  const [tours, setTours] = useState<TOUR_TYPE[]>([]);

  useEffect(() => {
    setTours(mockData.data);
    setTotal(mockData.total);
  }, []);

  const handleDeleteTour = (id: number) => {
    console.log(id);
    toast.success('Bạn đã xóa thành công');
  };

  return (
    <DefaultLayout>
      <ToastContainer autoClose={2000} />
      <Breadcrumb pageName="Tour" key={'tour'} />
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
                  <th className="min-w-[120px] py-4 px-4 text-left font-medium text-black dark:text-white"></th>

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
                      <img
                        src={data.photos![0]}
                        alt=""
                        className="w-full h-full rounded object-cover"
                      />
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
                        <b>Điểm đến:</b> {data.destination}
                      </h6>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark ">
                      <div></div>
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

export default ListTours;
