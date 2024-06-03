import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { routes, TOKEN } from "../../constants";
import { getCurrentUser } from "../../module/Login/store/loginMiddleware";
import { AppDispatch } from "../../redux/store";
import Header from "./Header/Header";
import SidebarScreen from "./SideBar/Sidebar";

export default function ProtectedLayout() {
  const location = useLocation();
  const useAuth = () => {
    const user = Cookies.get(TOKEN);
    return user && user;
  };
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
  });
  return (
    <div className="protected__layout__container">
      <div className="protected__layout__header">
        <Header />
      </div>
      <div className="protected__layout__content__space">
        <div className="protected__layout__sidebar__container">
          <SidebarScreen />
        </div>
        <div className="main__content">
          {useAuth() ? (
            <Outlet />
          ) : (
            <Navigate to={routes.LOGIN} state={{ from: location }} replace />
          )}
        </div>
      </div>
    </div>
  );
}
