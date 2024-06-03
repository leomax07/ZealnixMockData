import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../../Components/Buttons/Index";
import SliderComponent from "../../../Components/Slider/Index";
import TextInputComponent from "../../../Components/TextInput/Index";
import { routes } from "../../../constants";

function SignupForm() {
  const navigate = useNavigate();

  const handleSuccess = (e: MouseEvent) => {
    e.preventDefault();
    navigate(routes.SIGNUP_SUCCESS);
  };
  return (
    <div className="signup__form__container">
      <div className="signup__form__header">Hospital Onboarding</div>
      <form className="form__container">
        <div className="two__input__container">
          <div className="half">
            <TextInputComponent label="Name" placeholder="Enter your name" />
          </div>
          <div className="half">
            <TextInputComponent
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
          </div>
        </div>

        <div className="two__input__container">
          <div className="half">
            <TextInputComponent
              label="Contact Number"
              placeholder="Enter your contact number"
            />
          </div>
          <div className="half">
            <TextInputComponent
              label="Designation"
              placeholder="Enter your designation"
            />
          </div>
        </div>

        <div className="two__input__container">
          <div className="half">
            <TextInputComponent
              label="Hospital Name"
              placeholder="Enter your Hospital Name"
            />
          </div>
          <div className="half">
            <TextInputComponent
              label="No. of Branches"
              placeholder="Enter the number of branches"
              type="number"
            />
          </div>
        </div>

        <div className="two__input__container">
          <TextInputComponent
            label="Hospital Address"
            placeholder="Enter your Hospital Address with pincode"
          />
        </div>

        <div className="two__input__container">
          <div className="half">
            <TextInputComponent label="City" placeholder="Enter your City" />
          </div>
          <div className="half">
            <TextInputComponent label="State" placeholder="Enter the state" />
          </div>
        </div>

        <div className="two__input__container">
          <SliderComponent sliderId="noOfStaffs" label="No of Staffs" />
        </div>

        <div className="two__input__container">
          <SliderComponent
            sliderId="averageMonthlyVisita"
            label="Average Monthly Visits"
          />
        </div>

        <div className="submit__button__container">
          <ButtonComponent
            label="Submit"
            onClick={handleSuccess}
            classNames="full__width"
          />
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
