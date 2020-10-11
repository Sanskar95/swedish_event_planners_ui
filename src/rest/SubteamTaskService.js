import axios from "axios";

export const createSubteamTask = (requestBody) => {
    const url = "http://localhost:8080/subteam_task/create";
    return axios.post(url, requestBody);
};

export const getSubteamTasksPromise = () => {
    const url = "http://localhost:8080/subteam_task/get_all";
    return axios.get(url);
};

export const modifySubteamTaskPromise = (
    responseBody,
    status,
    id
) => {
    const url = "http://localhost:8080/subteam_task/modify";
    const config = {
        params: {
            id: id,
            status: status,
        },
    };
    return axios.put(url, responseBody, config);
};
