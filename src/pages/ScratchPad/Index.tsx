import { Route, Routes } from "react-router-dom";
import ScratchPad from "../../module/ScratchPad/Index";
import ProtectedLayout from "../../uikit/MainComponent/ProtectedLayout";

function ScratchPadIndex() {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/scratchpad" element={<ScratchPad />} />
        </Route>
      </Routes>
    </div>
  );
}

export default ScratchPadIndex;
