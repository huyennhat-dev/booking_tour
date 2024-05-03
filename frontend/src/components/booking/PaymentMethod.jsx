import { styles } from "../../styles/styles";
import Button from "../global/Button";

const PaymentMethodComponent = ({ handleCheckout }) => {
  const method = [
    {
      title: "Thanh toán bằng VNPAY",
      slug: "VPN",
    },
    {
      title: "Thanh toán bằng PAYPAL",
      slug: "PAYPAL",
    },
  ];
  return (
    <>
      <div className="col-span-12 md:col-span-12 box_shadow rounded-xl flex flex-col gap-2 px-4 md:p-6 py-4 mt-8 ">
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <label htmlFor="paymentMethod" className="font-semibold text-base">
              Chọn phương thức thanh toán:
            </label>
            <select
              name="payment-method"
              id="paymentMethod"
              className=" text-sm px-6 rounded ml-3 text-slate-700 border-[1px] border-gray-200 outline-none py-2 "
            >
              {method.map((m, index) => (
                <option key={index} value={m.slug}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1 text-end">
            <Button
              title="Đặt Ngay"
              onclick={handleCheckout}
              classes={`${styles.bgOrange} w-[200px] py-2 text-base font-medium py-2  text-white rounded-xl`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodComponent;
