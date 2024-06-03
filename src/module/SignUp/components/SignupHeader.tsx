import { Outlet, useNavigate } from "react-router-dom";
import BlueEagle from "../../../Components/BlueEagle/Index";
import ButtonComponent from "../../../Components/Buttons/Index";
import { routes } from "../../../constants";

function SignupHeader() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate(routes.LOGIN);
  };
  return (
    <div className="sigup__layout__component">
      <div className="herder__container">
        <div className="header__left">
          <BlueEagle />
          <ButtonComponent
            label="Login"
            classNames="withe__bordered__button"
            onClick={handleLogin}
          />
        </div>
        <div className="catch__phrase">Streamline your Hospital.</div>
      </div>
      <Outlet />
    </div>
  );
}

export default SignupHeader;
