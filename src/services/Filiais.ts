import api from "./Api";


const getFiliaisAtivas = () => {
    return api
        .get('/filiais/user/ativas')
        .then((response: any) => {
            return response.data;
        });
};


export default {
    getFiliaisAtivas,
};