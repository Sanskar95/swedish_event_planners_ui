import axios from "axios";

export const createRecruitmentRequest = (requestBody) => {
    const url = "http://localhost:8080/recruitment_request/create";
    return axios.post(url, requestBody);
};

export const getRecruitmentRequestsPromise = () => {
    const url = "http://localhost:8080/recruitment_request/get_all";
    return axios.get(url);
};

export const modifyRecruitmentRequestPromise = (
    responseBody,
    status,
    id
) => {
    const url = "http://localhost:8080/recruitment_request/modify";
    const config = {
        params: {
            id: id,
            status: status,
        },
    };
    return axios.put(url, responseBody, config);
};
