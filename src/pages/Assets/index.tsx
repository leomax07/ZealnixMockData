import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "../../uikit/MainComponent/ProtectedLayout";
import AssetsComponent from "../../module/AssetsModule/AssetsScreen";
import AssetsTable from "../../module/AssetsModule/AllAssets/AssetsTable";

function Assets() {
	return (
		<Routes>
			<Route element={<ProtectedLayout />}>
				<Route
					path="/assets"
					element={
						<AssetsComponent
							tabOptions={[
								{
									label: "Assets",
									to: "/assets/assetsscreen",
									index: 0,
								},
								{
									label: "Maintenance",
									to: "/assets/maintenance",
									index: 1,
								},
							]}
						/>
					}
				/>
				<Route
					path="/assets/:type/*"
					element={
						<AssetsComponent
							tabOptions={[
								{
									label: "Assets",
									to: "/assets/assetsscreen",
									index: 0,
								},
								{
									label: "Maintenance",
									to: "/assets/maintenance",
									index: 1,
								},
							]}
						/>
					}
				/>
				<Route path="/assets/:type/:id/*">
					<Route index />
					<Route
						path="assetsscreen"
						element={<AssetsTable />}
					/>
					<Route path="maintenance" />
				</Route>
			</Route>
		</Routes>
	);
}

export default Assets;
