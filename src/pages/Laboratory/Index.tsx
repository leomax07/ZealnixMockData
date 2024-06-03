import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "../../uikit/MainComponent/ProtectedLayout";
import LaboratoryScreen from "../../module/Laboratory/Laboratory";
import XRayIndex from "../../module/Laboratory/xRay/Index";
import MRIIndex from "../../module/Laboratory/MRI/Index";
import CTScanIndex from "../../module/Laboratory/CtScan/Index";

function Laboratory() {
	return (
		<Routes>
			<Route element={<ProtectedLayout />}>
				<Route
					path="/laboratory"
					element={<LaboratoryScreen />}
				>
					<Route
						path="x-ray"
						element={<XRayIndex />}
					/>
					<Route
						path="ct-scan"
						element={<CTScanIndex />}
					/>
					<Route
						path="MRI"
						element={<MRIIndex />}
					/>
				</Route>
				<Route
					path="/laboratory/:type/*"
					element={<LaboratoryScreen />}
				/>
			</Route>
		</Routes>
	);
}

export default Laboratory;
