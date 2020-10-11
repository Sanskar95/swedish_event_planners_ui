import axios from 'axios'

export const getEventPlanningRequestsPromise=()=>{
    const url = 'http://localhost:8080/event_request/get_all'
    return axios.get(url);
}

export const createEventPlanningRequest=(requestBody)=>{
    const url = 'http://localhost:8080/event_request/create'
    return axios.post(url , requestBody)
}