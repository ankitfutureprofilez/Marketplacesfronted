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

function App() {
  return (
    <Router>
      <ScrollToTop />   {/* Scroll to top*/}
      <Toaster position="top-right"
        reverseOrder={false} />
      <Routes>
        {/* Admin Chnagement */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendor" element={<List />} />
        <Route path="/sales" element={<SalesView />} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/vendor/:id" element={<Details />} />
        <Route path="/vendor/add" element={<AddVendor />} />
        <Route path="/vendor/add/:id" element={<AddVendor />} />

        <Route path="/payment-ra" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}
export default App;
