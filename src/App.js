import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Admin/Login/Login";
import ScrollToTop from "./component/ScrollToTop";
import Dashboard from "./Admin/Dashboard/Dashboard";
import List from "./Admin/vendor/List";
import SalesView from "./Admin/sales/SalesView";
import CustomerList from "./Admin/Customer/CustomerList";
import Setting from "./Admin/setting/Setting";
import Details from "./Admin/vendor/Details";
import AddVendor from "./Admin/vendor/AddVendor";
import PaymentPage from "./Payment";
import Payment from "./Admin/payment/Payment";
import CalendlyWidget from "./CalendlyWidget";
import "./App.css"
import TermsConditions from "./common/TermsConditions";
import PrivacyPolicy from "./common/PrivacyPolicy";
import Support from "./common/Support";
import Category from "./Admin/Categories/Category";
import SubCategories from "./Admin/SubCategories/SubCategories";
import SalesDetails from "./Admin/sales/SalesDetails";
import PurchaseHistory from "./Admin/Purchase/PurchaseHistory";
import CustomerDetail from "./Admin/Customer/CustomerDetail";

function App() {
  return (
    <Router>
      <ScrollToTop />   {/* Scroll to top*/}
      <Toaster position="top-right"
        reverseOrder={false} />
      <Routes>
        {/* Admin Chnagement */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/vendor" element={<List />} />
        <Route path="/sales" element={<SalesView />} />
        <Route path="/sales/:id" element={<SalesDetails />} />
        <Route path="/category" element={<Category />} />
        {/* <Route path="/subcategory" element={<SubCategories />} /> */}
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/customer/:id" element={<CustomerDetail />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/vendor/:id" element={<Details />} />
        <Route path="/vendor/add" element={<AddVendor />} />
        <Route path="/vendor/add/:id" element={<AddVendor />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/support" element={<Support />} />
        {/* <Route path="/payment-ra" element={<PaymentPage />} /> */}
        {/* <Route path="/cal-ra" element={<CalendlyWidget />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
