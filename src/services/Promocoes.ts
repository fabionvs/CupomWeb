import api from "./Api";


const create = (data : any) => {
    return api
        .post('/promocoes', data)
        .then((response: any) => {
            return response.data;
        });
};

const stats = () => {
    return api
        .get('/dashboard')
        .then((response: any) => {
            return response.data;
        });
};


export default {
    create,
    stats
};