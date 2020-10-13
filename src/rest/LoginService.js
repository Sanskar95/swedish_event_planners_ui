
import axios from 'axios'

export const login=(requestBody)=>{
    const url = 'http://localhost:8080/login'
    return axios.post(url, requestBody, {})

}