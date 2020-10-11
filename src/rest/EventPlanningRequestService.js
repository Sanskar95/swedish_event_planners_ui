import axios from 'axios'

export const getEventPlanningRequestsPromise=()=>{
    const url = 'http://localhost:8080/event_request/get_all'
    return axios.get(url);
}

export const createEventPlanningRequest=(requestBody)=>{
    const url = 'http://localhost:8080/event_request/create'
    return axios.post(url , requestBody)
}

export const getScsoApprovePromise=(id)=>{
    const url = 'http://localhost:8080/event_request/scso_approve'
    const config ={
        params: {
            id:id
        }
    }
    return axios.put(url,{}, config)

}

export const getFinancialManagerApprovalPromise=(id, feedBack)=>{
    const url = 'http://localhost:8080/event_request/financial_manager_approve'
    const config ={
        params: {
            id:id,
            feedback: feedBack
        }
    }
    return axios.put(url,{}, config)

}

export const getAdminApprovePromise=(id)=>{
    const url = 'http://localhost:8080/event_request/admin_approve'
    const config ={
        params: {
            id:id
        }
    }
    return axios.put(url,{}, config)

}

export const getFinalScsoApprovalPromise=(id)=>{
    const url = 'http://localhost:8080/event_request/final_scso_approve'
    const config ={
        params: {
            id:id
        }
    }
    return axios.put(url,{}, config)

}

