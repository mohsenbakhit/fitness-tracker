import { NavLink } from "react-router-dom";

const NavBtn = (props) => {
  return (
    <NavLink
      className="transition-all duration-300 ease-in-out text-white block py-4 px-2 hover:bg-gray-700"
      to={props.to}
    >
      {props.text}
    </NavLink>
  );
};

export default NavBtn;
