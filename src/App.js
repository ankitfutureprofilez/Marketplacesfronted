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

function App() {
  return (
    <Router>
      <ScrollToTop />   {/* Scroll to top*/}
      <Toaster position="top-right"
        reverseOrder={false} />
      <Routes>
        {/* Admin Chnagement */}
          <Route path="/access-admin/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/access-admin" element={<Dashboard />} />
        <Route path="/access-admin/vendor" element={<List />} />
        <Route path="/access-admin/sales" element={<SalesView />} />
        <Route path="/access-admin/user" element={<CustomerList />} />
        <Route path="/access-admin/setting" element={<Setting />} />
        <Route path="/access-admin/vendor/:id" element={<Details />} />
        <Route path="/access-admin/vendor/add" element={<AddVendor />} />
        <Route path="/access-admin/vendor/add/:id" element={<AddVendor />} />
        <Route path="/payment-ra" element={<PaymentPage />} />
        <Route path="/cal-ra" element={<CalendlyWidget />} />

      </Routes>
    </Router>
  );
}
export default App;
