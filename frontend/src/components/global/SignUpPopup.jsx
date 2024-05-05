import React, { useEffect, useState } from "react";
import { styles } from "../../styles/styles";
import { IoClose } from "react-icons/io5";
import { GoogleLogo } from "../../assets/export";
import Button from "./Button";
import authApi from "../../apis/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/authSlice";

const SignUpPopup = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setShowModal(!showModal);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState({
    fullName: {
      value: false,
      message: "",
    },
    email: {
      value: false,
      message: "",
    },
    password: {
      value: false,
      message: "",
    },
  });


  const validation = () => {
    let isValid = true;
    if (!formData.fullName) {
      setErrMsg((prev) => ({
        ...prev,
        fullName: { value: true, message: "Tên người dùng không hợp lệ!" },
      }));
      isValid = false;
    } else {
      setErrMsg((prev) => ({
        ...prev,
        fullName: { value: false },
      }));
      isValid = true;
    }

    if (!formData.email) {
      setErrMsg((prev) => ({
        ...prev,
        email: { value: true, message: "Email không hợp lệ!" },
      }));
      isValid = false;
    } else {
      setErrMsg((prev) => ({
        ...prev,
        email: { value: false },
      }));
      isValid = true;
    }

    if (!formData.password) {
      setErrMsg((prev) => ({
        ...prev,
        password: { value: true, message: "Mật khẩu không hợp lệ!" },
      }));
      isValid = false;
    } else {
      setErrMsg((prev) => ({
        ...prev,
        password: { value: false },
      }));
      isValid = true;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validation()) {
      authApi
        .register(formData)
        .then((rs) => {
          dispatch(setToken({ token: rs.token }));
          setShowModal(!showModal);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="">
      <button onClick={handleToggle} className={`font-normal`}>
        Đăng Ký
      </button>

      {showModal && (
        <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-40 transition-all duration-500">
          <div
            className="logout-overlay w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 transition-all duration-500 bg-[#303d438c]"
            onClick={handleToggle}
          ></div>
          <div className="absolute center-div w-4/5 md:w-2/5 min-h-[360px] bg-white z-50 box_shadow transition-all duration-500 flex flex-col gap-y-5 py-10 px-4 md:px-10 rounded-xl">
            <div className="absolute top-4 right-4">
              <IoClose
                className="text-xl cursor-pointer"
                onClick={handleToggle}
              />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-semibold">
                Điền thông tin để tạo tài khoản
              </h3>
            </div>
            <div className="w-full">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                className={`w-full p-3 rounded-xl border ${
                  errMsg.fullName.value ? "border-red-600" : "border-slate-300"
                } text-sm font-normal outline-none`}
                placeholder="Nhập tên của bạn"
              />
              {errMsg.fullName.value && (
                <p className="text-xs pl-2 mt-1 text-red-600">
                  {errMsg.fullName.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className={`w-full p-3 rounded-xl border ${
                  errMsg.email.value ? "border-red-600" : "border-slate-300"
                } text-sm font-normal outline-none`}
                placeholder="Nhập email của bạn"
              />
              {errMsg.email.value && (
                <p className="text-xs pl-2 mt-1 text-red-600">
                  {errMsg.email.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className={`w-full p-3 rounded-xl border ${
                  errMsg.password.value ? "border-red-600" : "border-slate-300"
                } text-sm font-normal outline-none`}
                placeholder="Nhập mật khẩu"
              />
              {errMsg.password.value && (
                <p className="text-xs pl-2 mt-1 text-red-600">
                  {errMsg.password.message}
                </p>
              )}
            </div>
            {/* <div className="w-full">
              <input
                type="password"
                className="w-full p-3 rounded-xl border border-slate-300 text-sm font-normal outline-none"
                placeholder="Nhập lại mật khẩu"
              />
            </div> */}
            {/* <div className="w-full py-0 text-right">
              <Link className="text-sm">Forgot Password?</Link>
            </div> */}
            <div className="w-full py-0 my-0">
              <Button
                title={"Đăng ký"}
                classes={`w-full py-3 text-white text-sm font-medium rounded-xl ${styles.bgOrange}`}
                onclick={handleSubmit}
              />
            </div>
            <div className="w-full flex items-center justify-center md:px-1">
              <div className="border w-full border-slate-200"></div>
              <div className="w-full text-center">
                <p className="text-sm">Phương thức khác</p>
              </div>
              <div className="border w-full border-slate-200"></div>
            </div>
            <div className="w-full">
              <button
                className={`w-full py-3 text-sm font-medium rounded-xl border border-slate-200 flex items-center justify-center gap-x-3`}
              >
                <img src={GoogleLogo} alt="" className="w-5 h-5" />
                Đăng ký với tài khoản Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPopup;
