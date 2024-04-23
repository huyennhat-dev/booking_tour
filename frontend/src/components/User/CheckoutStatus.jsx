/* eslint-disable react/prop-types */
const CheckoutStatus = (props) => {
  return (
    <div className="w-full px-28 mt-6  justify-center">
      <div className="mx-auto mb-4 flex w-[60%] justify-between items-center">
        <div className="text-center">
          <div
            className={`font-semibold mx-auto text-[24px] w-14 h-14 rounded-full ${
              props.status === "checkout"
                ? "bg-[color:var(--color-primary)]"
                : "bg-white"
            } items-center flex justify-center border-[1px] border-[color:var(--color-primary)]`}
          >
            1
          </div>
          <p>Điền thông tin</p>
        </div>
        <hr className="border-[2px] border-b-black w-[200px] h-[2px] border-transparent" />
        <div className="text-center">
          <div
            className={`font-semibold mx-auto text-[24px] w-14 h-14 rounded-full ${
              props.status === "payment"
                ? "bg-[color:var(--color-primary)]"
                : "bg-white"
            } items-center flex justify-center  border-[1px] border-[color:var(--color-primary)]`}
          >
            2
          </div>
          <p>Thanh toán</p>
        </div>
        <hr className="border-[2px] border-b-black w-[200px] h-[2px] border-transparent" />

        <div className="text-center">
          <div
            className={`font-semibold mx-auto text-[24px] w-14 h-14 rounded-full ${
              props.status === "confirm"
                ? "bg-[color:var(--color-primary)]"
                : "bg-white"
            } items-center flex justify-center  border-[1px] border-[color:var(--color-primary)]`}
          >
            3
          </div>
          <p>Xác nhận</p>
        </div>
      </div>

      <div className="rounded-md shadow-custom p-4">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">Tour</th>
              <th className="text-left">Khởi hành</th>
              <th className="text-left">Giá</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex items-center line-clamp-2 overflow-hidden font-semibold">
                <img
                  className="w-20 rounded-sm mr-2"
                  src="https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg"
                  alt=""
                />
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
          </tbody>
        </table>

        <form>

            <h4></h4>
        </form>
      </div>
    </div>
  );
};

export default CheckoutStatus;
