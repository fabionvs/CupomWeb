import api from "./Api";

const route = "/ato";


const list = () => {
    return api
        .get(route)
        .then((response: any) => {
            return response.data;
        });
};

const create = (data: any) => {
    return api.post(route, data).then((response) => {
        return response.data;
    }).catch((error: any) => {
        return error.response.data;
    });;
};

const update = (id: any, data: any) => {
    return api.put(route + '/' + id, data).then((response) => {
        return response.data;
    }).catch((error: any) => {
        return error.response.data;
    });
};

const show = (id: any) => {
    return api
        .get(route + '/' + id)
}
const getAtoAtivos = () => {
    return api
        .get('/ato-ativos')
        .then((response: any) => {
            return response.data;
        });
};

export default {
    list,
    create,
    show,
    update,
    getAtoAtivos
}