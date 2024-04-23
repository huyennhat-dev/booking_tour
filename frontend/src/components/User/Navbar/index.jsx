import Logo from "./Logo";
import NavLinks from "./NavLink";
import TourIcon from "../../../assets/icons/tour.svg";
import ContactIcon from "../../../assets/icons/contact.svg";
import CooperateIcon from "../../../assets/icons/cooperate.svg";
import MoneyIcon from "../../../assets/icons/money.svg";
import HomeIcon from "../../../assets/icons/home.svg";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-[color:var(--color-navbar-bg)] h-14 shadow px-20">
      <Logo />
      <div className="flex">
        <NavLinks toLink="/" titleLink="Trang Chủ" icon={HomeIcon} />
        <NavLinks toLink="/" titleLink="Khuyến mãi" icon={MoneyIcon} />
        <NavLinks toLink="/" titleLink="Tour của tôi" icon={TourIcon} />
        <NavLinks toLink="/" titleLink="Trung tâm hỗ trợ" icon={ContactIcon} />
        <NavLinks
          toLink="/"
          titleLink="Hợp tác với chúng tôi"
          icon={CooperateIcon}
        />
      </div>
    </nav>
  );
};
export default Navbar;
