import api from "./Api";


const getFiliaisAtivas = () => {
    return api
        .get('/filiais/user/ativas')
        .then((response: any) => {
            return response.data;
        });
};

const show = (id: any) => {
    return api
        .get('/filiais/' + id)
}

const update = (id: any,data: any) => {
    return api.put('/filiais/'+id, data).then((response) => {
        return response.data;
    }).catch((error: any) => {
        return error.response.data;
    });;
};

const create = (data: any) => {
    return api.post('/filiais', data).then((response) => {
        return response.data;
    }).catch((error: any) => {
        return error.response.data;
    });
};



export default {
    getFiliaisAtivas,
    show,
    update,
    create
};