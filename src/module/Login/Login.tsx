import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextInputComponent from "../../Components/TextInput/Index";
import HeartInHand from "../../assets/heartInHand.svg";
import PasswordInputComponent from "../../Components/PasswordInput/Index";
import ButtonComponent from "../../Components/Buttons/Index";
import CheckboxComponent from "../../Components/Checkbox/Index";
import BlueEagle from "../../Components/BlueEagle/Index";
import { LoginTypes } from "./store/loginTypes";
import { AppDispatch, RootState } from "../../redux/store";
import { login } from "./store/loginMiddleware";

export default function LoginComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<LoginTypes>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector<RootState, RootState["authReducers"]>(
    (state) => state.authReducers,
  );

  const handleLogin = async () => {
    const payload = { credentials, rememberMe };
    const data = await dispatch(login(payload));
    if (data.type === "login/login/rejected") {
      return;
    }
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login__component__container">
      <div className="login__componet__left__container">
        <div className="login__component__left__container__header">
          <BlueEagle />
        </div>
        <div className="login__comoponent__left__container__body">
          <img
            src={HeartInHand}
            alt="HeartInHand"
            className="login__component__left__container__image"
            width="500"
            height="500"
          />
          <p className="login__component__left__container__title">
            
          </p>
        </div>
        <div className="login__comoponent__left__container__footer" />
      </div>
      <div className="login__componet__right__container" >
        <div className="login__componet__right__container__form">
          <h1 className="title">Log in</h1>
          <p className="sub__title">Welcome back!, Please enter your details.</p>

          <div className="input__container">
            <TextInputComponent
              label="User ID"
              placeholder="Email"
              classNames="full__width"
              type="email"
              name="email"
              onChange={handleChange}
              value={credentials.email}
            />
          </div>

          <div className="password__container">
            <PasswordInputComponent
              label="Password"
              classNames="full__width"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <div className="remember__forgot__container">
            <div className="checkbox__compoent">
              <CheckboxComponent
                label="Remember me"
                checkboxId="rememberme"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.checked)}
              />
            </div>
            <div className="forgot__password__container primary__blue__text pointer">
              Forgot your password?
            </div>
          </div>

          <div className="button__container full__width">
            <ButtonComponent
              label="Login"
              classNames="full__width"
              disabled={false}
              type="primary"
              onClick={handleLogin}
            />
            <p className="error__message">{error}</p>
          </div>
          <p className="register__signup">
            Register your Hospital with us,{" "}
            <span className="primary__blue__text pointer" onClick={handleSignup}>
              Sign up here
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
