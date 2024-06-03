import LoginPage from "./pages/Login/Index";
import PharmacyPages from "./pages/Pharmacy/Index";
import Signup from "./pages/Signup/Index";
import Staffs from "./pages/Staffs/Index";
import MainComponent from "./uikit/MainComponent/maincomponent";
import Assets from "./pages/Assets";
import Appointments from "./pages/Appointments/Index";
import Laboratory from "./pages/Laboratory/Index";
import SettingsIndexPage from "./pages/Settings/Index";
import PatientsIndex from "./pages/Patients/Index";
import ScratchPadIndex from "./pages/ScratchPad/Index";
import ToastComponent from "./Components/ToastComponent/Index";

function App() {
  return (
    <div>
      <ToastComponent />
      <LoginPage />
      <Signup />
      <MainComponent />
      <Staffs />
      <PharmacyPages />
      <Assets />
      <Appointments />
      <Laboratory />
      <SettingsIndexPage />
      <PatientsIndex />
      <ScratchPadIndex />
    </div>
  );
}

export default App;
