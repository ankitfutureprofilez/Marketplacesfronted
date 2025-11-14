import { Component } from 'react';
import Api from './Api';
class Listing extends Component {

    async adminlogin(data) {
        return Api.post("/admin/login", data)
    }

    async profileVerify() {
        return Api.get("/admin/profile-token")
    }

     async ProfileUpdate(data) {
        return Api.post("/admin/edit", data)
    }

    async resetpassword(data){
        return  Api.post("/admin/reset/password" , data)
    }

    async salephoneverify(data) {
        return Api.post("/user/send-otp", data)
    }

    async SalesAdd(data) {
        return Api.post("/admin/sales_add", data)
    }

    async JobOpening(data) {
        return Api.post("/job-add", data)
    }

    async showsales(data) {
        return Api.get(`/admin/sales_list?search=${data}`,)
    }

    async getsales() {
        return Api.get(`/admin/sales-get`);
    }

    async customer(data) {
        return Api.get(`/admin/user_list?search=${data}`,)
    }

    async PaymentGet() {
        return Api.get("/admin/payment_get",)
    }
    async StatusSales(id, status) {
        return Api.get(`/admin/sales_status/${id}/${status}`,)
    }

    async AdminEditSales(id, data) {
        return Api.post(`/admin/sales/edit/${id}`,data)
    }

      async AdminDeleteSales(id) {
        return Api.post(`/admin/sales/delete/${id}`)
    }

    async Vendorget(data , status , categroy ) {
        return Api.get(`/admin/vendor_list?search=${data}&status=${status}&category=${categroy}`,)
    }
    async VendorAdds(data) {
        return Api.post("/admin/vendor-add", data)
    }
  async VendorEdit(data) {
        return Api.post("/admin/vendor-edit", data)
    }
    
     async AdminDashbaord() {
        return Api.get("/admin/dashboard",)
    }

     async assignStaff(data) {
        return Api.post("/admin/assign-staff", data)
    }

    async vendorStatus(id, status) {
        return Api.get(`/admin/vendor_status/${id}/${status}`,)
    }

    async vendor_details(id) {
        return Api.get(`/admin/vendor_details/${id}`,)
    }
    async category() {
        return Api.get("/vendor/categroy",)
    }

    async subcategory(id) {
        return Api.get(`/admin/subcatgroy/${id}`)
    }

    render() {
        return (
            <div>
                <>

                </>
            </div>
        )
    }
}

export default Listing;