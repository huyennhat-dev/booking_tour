import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import Button from "../components/global/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import authApi from "../apis/authApi";
import { setToken } from "../redux/authSlice";
import { UploadButton } from "@bytescale/upload-widget-react";

const Profile = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.auth);

  const [checked, setChecked] = useState(false);

  const [data, setData] = useState({
    avatar: "",
    fullname: "",
    curren_password: "",
    new_password: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      avatar: state?.userInfo?.avatar,
      fullname: state?.userInfo?.fullName,
    }));
  }, [state]);

  const handleSubmit = () => {
    if (checked)
      if (!data.curren_password || !data.new_password) {
        return toast.warning("Mật khẩu không hợp lệ!");
      }
    if (!data.fullname) return toast.warning("Tên người dùng không hợp lệ!");
    if (data.fullname == state?.userInfo.fullName) return;
    else
      authApi
        .update(data)
        .then((rs) => {
          console.log(rs);
          dispatch(setToken({ token: rs.token }));
          toast.success("Cập nhật thành công");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        });
  };

  const options = {
    apiKey: "public_W142iav5koFN628r9BXyvczdxXJM",
    maxFileCount: 1,
    editor: {
      images: {
        allowResizeOnMove: true,
        crop: true,
        cropRatio: 1,
        cropShape: "squad",
        preview: true,
      },
    },
    mimeTypes: ["image/jpeg", "image/png"],
    locale: {
      cancelBtn: "Hủy",
      cancelPreviewBtn: "Hủy",
      continueBtn: "Tiếp tục",
      removeBtn: "Xóa",
      submitBtnLoading: "Đang tải...",
    },
  };
  return (
    <div className="flex flex-col gap-y-10">
      <div className={`w-full overflow-hidden ${styles.horizontalPadding}`}>
        <div className="w-full  my-6">
          <div className="w-full  py-2 flex flex-col gap-4">
            <div className="w-full grid grid-cols-1 md:grid-cols-9 lg:grid-cols-9 px-2 border md:p-3 rounded-xl gap-4 hover:shadow-xl duration-200 ease-in-out">
              <div className="col-span-1"></div>
              <div className="w-full h-full col-span-2 flex items-center">
                <div className=" w-60 h-60 my-auto p-[2px] border-[4px] border-[color:#EB662B] rounded-2xl">
                  <UploadButton
                    options={options}
                    onComplete={(files) =>
                      setData((prev) => ({
                        ...prev,
                        avatar: files.map((x) => x.fileUrl).join("\n"),
                      }))
                    }
                  >
                    {({ onClick }) => (
                      <img
                        src={data.avatar}
                        alt="tour image"
                        onClick={onClick}
                        className="w-full h-full cursor-pointer object-cover rounded-xl "
                      />
                    )}
                  </UploadButton>
                </div>
              </div>
              <div className="col-span-5">
                <div className="w-full">
                  <label htmlFor="email" className="text-base mx-1">
                    Email của bạn
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={state?.userInfo?.email || ""}
                    disabled
                    className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                    placeholder="Nhập email của bạn"
                  />
                </div>
                <div className="w-full mt-2">
                  <label htmlFor="name" className="text-base mx-1">
                    Tên của bạn
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={data.fullname}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        fullname: e.target.value,
                      }))
                    }
                    className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
                <div className="w-full my-4 flex items-center">
                  <input
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    id="checkbox"
                    type="checkbox"
                    className="mx-2 w-4 h-4"
                  />
                  <label htmlFor="checkbox" className="text-base mx-1">
                    Bạn muốn đổi mật khẩu
                  </label>
                </div>
                {checked && (
                  <div className="duration-1000 ease-in-out ">
                    <div className="w-full mt-2">
                      <label htmlFor="crr_password" className="text-base mx-1">
                        Mật khẩu hiện tại
                      </label>
                      <input
                        id="crr_password"
                        type="password"
                        value={data.curren_password}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            curren_password: e.target.value,
                          }))
                        }
                        className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                        placeholder="Nhập mât khẩu hiện tại"
                      />
                    </div>
                    <div className="w-full mt-2">
                      <label htmlFor="new_password" className="text-base mx-1">
                        Mật khẩu mới
                      </label>
                      <input
                        id="new_password"
                        type="password"
                        value={data.new_password}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            new_password: e.target.value,
                          }))
                        }
                        className="w-full p-3 rounded-xl border mt-1 border-slate-300 text-sm font-normal outline-none"
                        placeholder="Nhập mât khẩu mới"
                      />
                    </div>
                  </div>
                )}
                <div className="w-full text-center my-5">
                  <Button
                    title={"Cập nhật"}
                    classes={`px-10 py-3 text-white text-sm font-medium rounded-xl ${styles.bgOrange}`}
                    onclick={handleSubmit}
                  />
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
