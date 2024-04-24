import appData from "../../_mock/appData";

const LogoComponent = () => {
  return (
    <div className="flex">
      <img src={appData.logoImage} alt="" className="" />
      <span className="text-[color:#ee7743] mx-2 font-bold text-3xl"> {appData.appName}</span>
    </div>
  );
};

export default LogoComponent;
