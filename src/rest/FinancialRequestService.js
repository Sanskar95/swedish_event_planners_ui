import axios from "axios";

export const createFinancialRequest = (requestBody) => {
  const url = "https://swedish-event-planners.herokuapp.com/financial_request/create";
  return axios.post(url, requestBody);
};

export const getFinancialRequestsPromise = () => {
  const url = "https://swedish-event-planners.herokuapp.com/financial_request/get_all";
  return axios.get(url);
};

export const modifyFinancialRequestPromise = (
  responseBody,
  agreedAmount,
  id
) => {
  const url = "https://swedish-event-planners.herokuapp.com/financial_request/modify";
  const config = {
    params: {
      id: id,
      agreedAmount: agreedAmount,
    },
  };
  return axios.put(url, responseBody, config);
};
