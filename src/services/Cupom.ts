import api from "./Api";


const getCupomByCode = (codigo: string) => {
    return api
        .get('/cupons/empresa/check-consumir',{
            params: {'cd_cupom' : codigo}
        })
        .then((response: any) => {
            return response.data;
        });
};

const consumirCupom = (data: any) => {
    return api.post("/cupons/empresa/consumir", data).then((response: any) => {
        return response.data;
    }).catch((error: any) => {
        return error.response.data;
    });
};


export default {
    getCupomByCode,
    consumirCupom,
};