import { Route, Routes } from "react-router-dom";
import PharmacyDeliveryManagement from "../../module/Pharmacy/DeliveryManagement/Index";
import TokenManagement from "../../module/Pharmacy/DeliveryManagement/TokenManagement";
import PharmacyIndex from "../../module/Pharmacy/Index";
import PharmacyInventory from "../../module/Pharmacy/Inventory/PharmacyInventory";
import PharmacyPurchase from "../../module/Pharmacy/Purchase/Index";
import PharmacySales from "../../module/Pharmacy/Sales/Index";
import ProtectedLayout from "../../uikit/MainComponent/ProtectedLayout";

function PharmacyPages() {
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path="/pharmacy/tokenmanagement" element={<TokenManagement />} />
        <Route path="/pharmacy/*" element={<PharmacyIndex />}>
          <Route path="inventory" element={<PharmacyInventory />} />
          <Route path="sales" element={<PharmacySales />} />
          <Route path="purchases" element={<PharmacyPurchase />} />
          <Route path="delivery" element={<PharmacyDeliveryManagement />} />
          <Route path="tokenmanagement" element={<TokenManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default PharmacyPages;
