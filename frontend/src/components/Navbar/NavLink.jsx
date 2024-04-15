import { NavLink } from "react-router-dom";

const NavLinks = (props) => {
  return (
    <NavLink
      to={props.toLink || ""}
      className="flex hover:text-[color:var(--color-primary)] mx-3"
    >
      <img className="w-[18px]" src={props.icon} />
      <p className="ml-2 text-[14px] font-normal">{props.titleLink}</p>
    </NavLink>
  );
};

export default NavLinks;
