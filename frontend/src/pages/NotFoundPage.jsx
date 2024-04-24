import { Link } from "react-router-dom";
import { NotFound } from "../assets/export";
import { FaHome } from "react-icons/fa";
import { styles } from "../styles/styles";
const NotFoundPage = () => {
  return (
    <>
      <div className="grid grid-cols-2 px-3 md:px-8 lg:px-16 xl:px-18 py-16">
        <div>
          <img src={NotFound} alt="" />
        </div>
        <div className="h-full w-full col-span-1 flex items-center">
          <div className="text-center w-full">
            <p className="text-9xl font-bold">40<span className={styles.orangeText}>4</span></p>
            <p>
              Trang bạn đang tìm kiếm không có sẵn. Hãy thử tìm kiếm lại hoặc
              nhấn nút dưới.
            </p>
            <div className="w-full py-2  my-5">
              <Link
                to="/"
                className="delay-75 duration-100 ease-in-out w-[200px] px-8 py-2  my-5 border-[1px] border-[color:#eb662b] rounded-md hover:bg-[color:#eb662b] hover:text-white"
              >
                Trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
