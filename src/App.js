import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Admin/Login/Login";
import ScrollToTop from "./component/ScrollToTop";
import Dashboard from "./Admin/Dashboard/Dashboard";
import List from "./Admin/vendor/List";
import SalesView from "./Admin/sales/SalesView";
import CustomerList from "./Admin/Customer/CustomerList";

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
      </Routes>
    </Router>
  );
}
export default App;
