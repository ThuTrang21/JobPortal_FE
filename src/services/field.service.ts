import { publicRequest } from "../utils/request";

const fieldService={
    getJobRolesByFieldId:(id:number)=>
        publicRequest.request({
            url:`/field/${id}/job-roles`,
            method:'GET',
        })
    
}
export default fieldService;