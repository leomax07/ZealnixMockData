import Cookies from "js-cookie";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { routes, TOKEN } from "../../constants";
import LoginComponent from "../../module/Login/Login";

export default function LoginPage() {
  const location = useLocation();
  const token = Cookies.get(TOKEN);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/login" && token) {
      navigate("/");
    }
  });
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<LoginComponent />} />
    </Routes>
  );
}
