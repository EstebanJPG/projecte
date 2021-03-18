import axios from 'axios';

const baseURL2 = 'http://backoffice.g2.batoilogic.es/api';
const DEBUG = true;
const config = {
    headers: {
        'Authorization': 'Bearer' + localStorage.token,
    }
};
axios.interceptors.request.use((config) => {
    if (DEBUG) {
        console.info('Request: ', config);
    }

    const token = localStorage.token;
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.token;
    }
    return config;
}, (error) => {
    if (DEBUG) {
        console.error('Request error: ', error);
    }
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    if (DEBUG) {
        console.info('Response: ', response);
    }
    return response;
}, (error) => {
    if (error.response && error.response.status !== 400) {
        alert('Response error ' + error.response.status + '(' + error.response.statusText + ')')
    }
    if (DEBUG) {
        console.info('Response error: ', error);
    }
    return Promise.reject(error);
});
const search ={
    getUser : (email1) => axios.post(`${baseURL2}/search`,{email:email1}),
 };
 const searchOrders ={
    getOrders : (id) => axios.post(`${baseURL2}/searchOrderUser`,{userid:id}),
 };
const orders = {
    getAll: () => axios.get(`${baseURL2}/orders`, config),
    getOne: (id) => axios.get(`${baseURL2}/orders/${id}`, config),
    create: (item) => axios.post(`${baseURL2}/orders`, item, config),
    modify: (item) => axios.put(`${baseURL2}/orders/${item.id}`, item, config),
    delete: (id) => axios.delete(`${baseURL2}/orders/${id}`, config),
};
const products = {
    getAll: () => axios.get(`${baseURL2}/products`, config),
    getOne: (id) => axios.get(`${baseURL2}/products/${id}`, config),
    create: (item) => axios.post(`${baseURL2}/products`, item, config),
    modify: (item) => axios.put(`${baseURL2}/products/${item.id}`, item, config),
    delete: (id) => axios.delete(`${baseURL2}/products/${id}`, config),
};
const users = {
    getOne: (id) => axios.get(`${baseURL2}/users/${id}`, config),
    getUser: (email, pass) => axios.get(`${baseURL2}/users?email=${email}&password=${pass}`),
    getAll: () => axios.get(`${baseURL2}/users`),
    create: (item) => axios.post(`${baseURL2}/users`, item),
    checkEmail: (email) => new Promise((resolv, reject) => {
        axios.get(`${baseURL2}/users?email=${email}`)
        .then(response => { if (response.data.length) { resolv({ errors: { email: 'Ese email ya está registrado' } }) } else { resolv({}) } })
   .catch(error => reject(error)) }),


}
const states = {
    getUser: (id) => axios.get(`${baseURL2}/states?id=${id}`),
    //  getAll: () => axios.get(`${baseURL}/states`),
    create: (item) => axios.post(`${baseURL2}/states`, item),
}
//loginApi
const login = {

    getToken: (email, pass) => axios.post(`${baseURL2}/login`, { login: email, password: pass }),

}
const ordersApi = {
    getAll: () => axios.get(`${baseURL2}/orders`, config),
    getOne: (id) => axios.get(`${baseURL2}/orders/${id}`, config),
    create: (item) => axios.post(`${baseURL2}/orders`, item, config),
    modify: (item) => axios.put(`${baseURL2}/orders/${item.id}`, item, config),
    delete: (id) => axios.delete(`${baseURL2}/orders/${id}`, config),
};
const ordersLineApi = {
    getAll: () => axios.get(`${baseURL2}/orderlines`, config),
    getOne: (id) => axios.get(`${baseURL2}/orderlines/${id}`, config),
    create: (item) => axios.post(`${baseURL2}/orderlines`, item, config),
    modify: (item) => axios.put(`${baseURL2}/orderlines/${item.id}`, item, config),
    delete: (id) => axios.delete(`${baseURL2}/orderlines/${id}`, config),
};
export default {
    orders,
    users,
    states,
    login,
    ordersApi,
    products,
    ordersLineApi,
    search,
    searchOrders

};