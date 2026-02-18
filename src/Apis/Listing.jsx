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

    async resetpassword(data) {
        return Api.post("/admin/reset/password", data)
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

    async CustomerDetail(data) {
        return Api.get(`/admin/user/${data}`,)
    }

    async PaymentGet() {
        return Api.get("/admin/payment_get",)
    }
    async StatusSales(id, status) {
        return Api.get(`/admin/sales_status/${id}/${status}`,)
    }

    async AdminEditSales(id, data) {
        return Api.post(`/admin/sales/edit/${id}`, data)
    }

    async AdminDeleteSales(id) {
        return Api.post(`/admin/sales/delete/${id}`)
    }

    async Vendorget(data, status, categroy) {
        return Api.get(`/admin/vendor_list?search=${data}&status=${status}&category=${categroy}`,)
    }
    async AdminVendorAdd(data) {
        return Api.post("/admin/vendor-add", data)
    }

    async VendorEdit(id, data) {
        return Api.post(`/admin/vendor-edit/${id}`, data)
    }

    async VendorGalleryAdd(id, data) {
        return Api.post(`/admin/vendor/gallery/upload/${id}`, data)
    }
    async VendorGalleryDelete(id, data) {
        return Api.post(`/admin/vendor/gallery/delete/${id}`, data)
    }

    async AdminDashbaord() {
        return Api.get("/admin/dashboard",)
    }

    async AdminDashbaordSales(start, end) {
        return Api.get(`/admin/dashboard/sales?start=${start}&end=${end}`,);
    }

    async OfferGetById(data) {
        return Api.get(`/admin/offer/${data}`);
    }
    
    async OfferUpdate(id, data) {
        return Api.post(`/admin/offer/update/${id}`, data);
    }  

    async PurchasedOfferGet(search, status) {
        return Api.get(`/admin/brought-offer?search=${search}&status=${status}`);
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
    async subcategory(id) {
        return Api.get(`/admin/subcatgroy/${id}`)
    }

    async category() {
        return Api.get("/category/all");
    }

    async GetAllcategory() {
        return Api.get("/admin/category/get");
    }

    async addCategory(body) {
        return Api.post("/category/add", body);
    }

    async updateCategory(id, body) {
        return Api.post(`/category/update/${id}`, body);
    }

    async deleteCategory(id) {
        return Api.post(`/category/delete/${id}`);
    }
    async Subcategory() {
        return Api.get("/subcategory/all");
    }


    async addSubCategory(body) {
        return Api.post("/subcategory/add", body);
    }

    async subdeleteCategory(id) {
        return Api.post(`/subcategory/delete/${id}`);
    }

    async updateSubCategory(id, body) {
        return Api.post(`/subcategory/update/${id}`, body);
    }

    async sales_details(id) {
        return Api.get(`/admin/sales_id/${id}`);
    }

    async getHome() {
        return Api.get(`/home/find`);
    }

    async updateHome(data) {
        return Api.post(`/home/update`, data);
    }

    async addSubAdmin(data) {
        return Api.post(`/admin/sub-admin/add`, data);
    }

    async updateSubAdmin(id, data) {
        return Api.post(`/admin/sub-admin/update/${id}`, data);
    }

    async getSubAdmin() {
        return Api.get(`/admin/sub-admin/get`);
    }

    async getEnquiries(data) {
        return Api.get(`/enquiry/get?search=${data}`)
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