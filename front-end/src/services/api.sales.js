import axios from 'axios';

const sales = async (payload) => {
  try {
    const headers = { authorization: payload.token };
    const localhost = process.env.HOSTNAME || 'localhost';

    const request = {
      method: 'get',
      url: `http://${localhost}:3001/sales`,
      headers,
    };

    if (payload.order) {
      request.method = 'post';
      request.url = `http://${localhost}:3001/sales/create`;
      request.data = payload.order;
    }
    if (payload.saleId) request.url = `http://${localhost}:3001/sales/${payload.saleId}`;

    const result = await axios(request);
    console.log('Sales request: ', result);
    return result.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      return error.response.data;
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
};

export default sales;
