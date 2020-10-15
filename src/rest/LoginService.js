
import axios from 'axios'

export const login=(requestBody)=>{
    const url = 'https://swedish-event-planners.herokuapp.com/login'
    return axios.post(url, requestBody, {})

}