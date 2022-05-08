/* eslint-disable import/first */
import api from "./Api";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import moment from 'moment';
import { Subject } from 'rxjs';
const subject = new Subject();
const login = (data: any) => {
    return api
        .post("/login", data)
        .then((response) => {
            if (response.data.token) {
                cookies.set('user', JSON.stringify(response.data), { path: '/', expires : moment().add(8, 'hour').toDate() });
                observable.setUser(response.data)
            }
            return response.data;
        });
};

const logout = () => {
    cookies.remove('user');
    observable.clearUser()
    return true;
};

const getToken = () => {
    let user = cookies.get('user');
    if(user !== undefined){
        return user;
    }
    return null;
};

const register = (data: any) => {
    return api
        .post("/register", data)
        .then((response) => {
            if (response.data.token) {
                cookies.set('user', JSON.stringify(response.data), { path: '/', expires : moment().add(8, 'hour').toDate() });
                observable.setUser(response.data)
            }
            return response.data;
        });
};

const callApiUrl = (url: string, body: any) => {
    return api
        .get(url, {
            params: body
        })
        .then((response) => {
            return response;
        });
};



const observable = {
    setUser: (user:any) => subject.next(user),
    clearUser: () => subject.next(null),
    onUser: () => subject.asObservable()
};


export default {
    login,
    logout,
    getToken,
    callApiUrl,
    observable,
    register
};