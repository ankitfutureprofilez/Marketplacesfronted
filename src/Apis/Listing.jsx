import { Component } from 'react';
import Api from './Api';
class Listing extends Component {

    async adminlogin(data) {
        return Api.post("/admin/login", data)
    }

    async profileVerify() {
        return Api.get("/admin/profile-token")
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

    async showsales() {
        return Api.get("/admin/sales_list",)
    }

    async StatusSales(id, status) {
        return Api.get(`/admin/sales_status/${id}/${status}`,)
    }
    async Vendorget() {
        return Api.get("/admin/vendor_list",)
    }
    async VendorAdds(data) {
        return Api.post("/admin/vendor-add", data)
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