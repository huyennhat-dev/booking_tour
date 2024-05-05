import React, { useEffect, useState } from "react";
import { styles } from "../styles/styles";
import Button from "../components/global/Button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import authApi from "../apis/authApi";
import { setToken } from "../redux/authSlice";
import { UploadButton } from "@bytescale/upload-widget-react";
import { CiCamera } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);

  const [checked, setChecked] = useState(false);

  const [data, setData] = useState({
    avatar: "",
    fullName: "",
    current_password: "",
    new_password: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      avatar: state?.userInfo?.avatar,
      fullName: state?.userInfo?.fullName,
    }));
    if (!state.isLoggedIn) navigate("/");
  }, [state]);

  const handleSubmit = () => {
    if (checked)
      if (!data.current_password || !data.new_password) {
        return toast.warning("Mật khẩu không hợp lệ!");
      }
    if (!data.fullName) return toast.warning("Tên người dùng không hợp lệ!");

    authApi
      .update(data)
      .then((rs) => {
        console.log(rs);
        dispatch(setToken({ token: rs.token }));
        toast.success("Cập nhật thành công");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message);
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
            <div className="w-full grid grid-cols-1 md:grid-cols-9 lg:grid-cols-9 px-2 border md:p-3 rounded-xl gap-4  duration-200 ease-in-out">
              <div className="col-span-1"></div>
              <div className="w-full h-full col-span-2 flex items-center">
                <div className="relative w-60 h-60 my-auto p-[2px] border-[4px] border-[color:#EB662B] rounded-2xl">
                  <UploadButton
                    options={options}
                    onComplete={(files) => {
                      if (files.map((x) => x.fileUrl).join("\n"))
                        setData((prev) => ({
                          ...prev,
                          avatar: files.map((x) => x.fileUrl).join("\n"),
                        }));
                    }}
                  >
                    {({ onClick }) => (
                      <div>
                        <img
                          src={data.avatar}
                          alt="tour image"
                          onClick={onClick}
                          className="w-full h-full cursor-pointer object-cover rounded-xl "
                        />
                        <div className="absolute bottom-1 right-1 p-2 rounded-full bg-sky-500">
                          <CiCamera
                            className=" text-3xl"
                            stroke="#fff"
                            strokeWidth={0.4}
                            fill="#fff"
                          />
                        </div>
                      </div>
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
                    value={data.fullName}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
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
                        value={data.current_password}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            current_password: e.target.value,
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
