import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useProSidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { TOKEN } from "../../../constants";
import { RootState } from "../../../redux/store";
import HamIcon from "../../../Icon/hamIcon.svg";
// import logo from "../../../assets/logo.svg";
import ProfileImg from "../../../Icon/profile.svg";
import logo from "../../../assets/zealsvg.svg";
import "./header.scss";

function Header() {
  const op = useRef<OverlayPanel>(null);
  const { collapseSidebar } = useProSidebar();
  const { currentUser } = useSelector<RootState, RootState["authReducers"]>(
    (store) => store.authReducers
  );
  const [toggle, setToggle] = useState<boolean>(false);
  const toggleIcon = toggle ? "pi pi-chevron-up" : "pi pi-chevron-down";
  const navigate = useNavigate();

  // <=============[METHODS]=====================//
  const overlayToggler = (e: any) => {
    op?.current?.toggle(e);
    setToggle(!toggle);
  };

  const logoutHandler = () => {
    Cookies.remove(TOKEN);
    setToggle(false);
    navigate("/login");
  };

  // <===================[TEMPLATE]====================//
  return (
    <header className="main__header__container">
      <div className="flexClassheader header__left">
        <div>
          <img
            src={logo}
            alt="Logo"
            height={75}
            width={150}
            // className="logoSet header__left__logo"
          />
        </div>
      </div>
      <div className="title">
        <h2 className="title">HOSPITAL MANAGEMENT SYSTEM</h2>
      </div>
      <div className="flexClassheader header__right">
        <div className="header__icon">
          <Avatar
            image={currentUser?.profilePicUrl ?? ProfileImg}
            size="large"
            shape="circle"
          />
        </div>
        <div className="header__user__container">
          <div className="header__user__name">{currentUser?.name ?? "Leo"}</div>
          <div className="header__user__name">
            {currentUser?.name ?? "Admin"}
          </div>
          <div className="header__user__role capitalize">
            {currentUser?.type?.replace("_", " ") ?? ""}
          </div>
        </div>
        <div className="header__user__toggler">
          <i
            onClick={overlayToggler}
            aria-label="Mute volume"
            onKeyDown={overlayToggler}
            role="button"
            tabIndex={0}
            className={`${toggleIcon} toggler`}
          />
          <OverlayPanel ref={op} className="table__overlay__component">
            <div
              onClick={logoutHandler}
              onKeyDown={logoutHandler}
              role="button"
              tabIndex={0}
              className="edit__container list__item blue__on__hover"
            >
              <i className="pi pi-sign-out" />
              Logout
            </div>
          </OverlayPanel>
        </div>
      </div>
    </header>
  );
}

export default Header;
