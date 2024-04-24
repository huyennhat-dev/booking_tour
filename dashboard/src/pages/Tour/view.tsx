import DefaultLayout from '../../layout/DefaultLayout';

const ViewTour = () => {
  return (
    <DefaultLayout>
      <div className="w-full rounded-md bg-white p-15 md:flex items-start justify-center 2xl:px-20 md:px-6 text-black">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          <img
            className="w-full"
            alt="image of a girl posing"
            src="https://i.ibb.co/QMdWfzX/component-image-one.png"
          />
          <img
            className="mt-6 w-full"
            alt="image of a girl posing"
            src="https://i.ibb.co/qxkRXSq/component-image-two.png"
          />
        </div>
        <div className="md:hidden">
          <img
            className="w-full"
            alt="image of a girl posing"
            src="https://i.ibb.co/QMdWfzX/component-image-one.png"
          />
          <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
            <img
              alt="image-tag-one"
              className="md:w-48 md:h-48 w-full"
              src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
            />
            <img
              alt="image-tag-one"
              className="md:w-48 md:h-48 w-full"
              src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
            />
            <img
              alt="image-tag-one"
              className="md:w-48 md:h-48 w-full"
              src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
            />
            <img
              alt="image-tag-one"
              className="md:w-48 md:h-48 w-full"
              src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
            />
          </div>
        </div>

        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600 dark:text-gray-300 ">
              Huế - Đà Nẵng - Hội An
            </p>
            <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
            Thừa Thiên Huế: Thêm nhiều hoạt động hút khách đến vịnh đẹp Lăng Cô 
            </h1>
          </div>
          <div className="py-2 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
              <b>Dẫn Đoàn</b>
            </p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 dark:text-gray-300">
                Nguyễn Đức Bảo
              </p>
              <div className="w-6 h-6 bg-gradient-to-b from-gray-900 to-indigo-500 ml-3 mr-4 cursor-pointer"></div>
              <svg
                className="cursor-pointer text-gray-300 dark:text-white"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L1 9"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="py-2  flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
              Giá ban đầu
            </p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
                2000000 VND / Người
              </p>
              
            </div>
          </div>
          <div className="py-2 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800 dark:text-gray-300">
              <b>Khuyến mãi</b>
            </p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 dark:text-gray-300 mr-3">
                2000000 VND / Người
              </p>
            </div>
          </div>
          <div>
            <p className=" text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-300 mt-7">
              Nhiều hoạt động hấp dẫn du khách Với vẻ đẹp thiên nhiên ban tặng,
              vào ngày 16/5/2009, tại Setubal - Bồ Đào Nha, vịnh Lăng Cô được
              kết nạp vào Câu lạc bộ các vịnh đẹp nhất thế giới. Tròn 15 năm
              được công nhận là vịnh đẹp thế giới, UBND huyện Phú Lộc sẽ tổ chức
              nhiều hoạt động kỷ niệm gắn với quảng bá hình ảnh vịnh Lăng Cô gắn
              với tiềm năng, thế mạnh phát triển du lịch của huyện Phú Lộc đến
              với đông đảo du khách trong và ngoài nước, thu hút nguồn lực đầu
              tư, thúc đẩy du lịch phát triển. Ông Nguyễn Hải Đăng, Phó Chủ tịch
            </p>
            <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">
              <b>Thời gian</b> : 20/10/2021 - 25/10/2021
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
              <b>Bảo hiểm</b> : Khôpng bao gồm
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
              <b>Phương tiện</b> : Ô tô / Máy bay / Tàu hỏa 
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">
              <b>Ăn uống</b> : Không hổ trợ ăn uống
            </p>
            <h4 className="md:w-96 text-xl font-bold leading-normal text-gray-600 dark:text-gray-300 mt-4">
              Thông tin người dẫn đoàn
            </h4>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewTour;
