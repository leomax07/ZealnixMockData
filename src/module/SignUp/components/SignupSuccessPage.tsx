import signupSuccessImage from "../../../assets/signupScuccess.svg";

function SignupSuccessPage() {
  return (
    <div className="signup__form__container sucess__page__container">
      <div className="signup__form__header">Hospital Onboarding</div>
      <img src={signupSuccessImage} alt="success" className="success__image" />
      <p>
        Your onboarding form has been submitted and our team will get back to
        you, shortly.
      </p>
    </div>
  );
}

export default SignupSuccessPage;
