import { Link } from "react-router-dom";
import { styles } from "../styles/styles";
import { FaCircleCheck } from "react-icons/fa6";

const PaymentStatusPage = () => {
  return (
    <>
      <div
        className={`${styles.horizontalPadding}  px-2 mb-10 text-center w-full h-[400px] flex items-center`}
      >
        <div className="w-full ">
          <div className="w-full flex justify-center">
            <FaCircleCheck fill="green" size={100} />
          </div>
          <div className="w-full text-center">
            <p className="text-4xl my-3">Bạn đã thanh toán thành công! </p>
            <p className="text-sm">
              Hãy click vào đây để trở về
              <Link to="/" className="text-blue-600 mx-1 underline">
                trang chủ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentStatusPage;
