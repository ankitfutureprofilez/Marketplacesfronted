import { Component } from 'react';
import Api from './Api';
class Listing extends Component {

    async adminlogin(data) {
        return Api.post("/login", data)
    }

    async profileVerify(){
        return Api.get("/profile-token")
    }

    async resetpassword(data) {
        return Api.post("/reset-password", data)
    }
    
    async contact(data) {
        return Api.post("/contact-add", data)
    }

    async JobOpening(data) {
        return Api.post("/job-add", data)
    }

    async ContactGet(data) {
        return Api.get("/contact-get", data)
    }

    async CareeruserList(data) {
        return Api.get("/job-get", data)
    }



    async ProjectAdds(data) {
        return Api.post("/project-add", data)
    }

    async subscribe(data) {
        return Api.post("/subscribe/subscribe-add", data)
    }

    async SubscribeEmail() {
        return Api.get("/subscribe/subscribe-email")
    }

    async AddTeam(data) {
        return Api.post("/teams", data)
    }



    async BlogAdd(data) {
        return Api.post("/blog/create", data)
    }

    async BlogUpdate(data) {
        return Api.post("/blog/update", data)
    }


    async BlogGetId(data) {
        return Api.get(`/blog/get/${data}`,)
    }

    async ProjectGetId(data) {
        return Api.get(`/project-get/${data}`,)
    }

    async ProjectUpdate(data) {
        return Api.post("/project/update", data)
    }

    async ProjectDelete(data) {
        return Api.post("/project/delete", data)
    }

    async BlogDelete(data) {
        return Api.post("/blog/delete", data)
    }
    async BlogGet(data) {
        return Api.get("/blog/get", data)
    }

    async ProjectGet(data) {
        return Api.get("/project-get", data)
    }
    async Editeam(data) {
        return Api.post("/teams-edit", data)
    }

    async deleteteam(data) {
        return Api.post("/teams-delete", data)
    }

    async teamlist() {
        return Api.get("/teams")
    }

    async JobGet() {
        return Api.get("/jobget")
    }
    async AddJob(data) {
        return Api.post("/jobadd", data)
    }

    async EditJob(data) {
        return Api.post("/jobedit", data)
    }

    async JobDelete(data) {
        return Api.post("/jobdelete", data)
    }
    

    async ProfileUpdate(data) {
        return Api.post("/profile-update", data)
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