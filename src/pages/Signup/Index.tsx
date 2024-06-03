import { Route, Routes } from "react-router-dom";
import SignupHeader from "../../module/SignUp/components/SignupHeader";
import SignupSuccessPage from "../../module/SignUp/components/SignupSuccessPage";
import SignUp from "../../module/SignUp/Index";

function Signup() {
  return (
    <Routes>
      <Route element={<SignupHeader />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/success" element={<SignupSuccessPage />} />
      </Route>
    </Routes>
  );
}

export default Signup;
