import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate
} from "react-router-dom";
import Header from './components/header/Header';
import Navbar from './components/header/Navbar';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Auth from './services/Auth';
import Loading from './utils/Loading';
import App from './views/app/App';
import Login from './views/auth/login/Login';
import Register from './views/auth/login/Register';
import Logout from './views/auth/login/Logout';
import Cupom from './views/cupom/Index';
import Promocoes from './views/promocoes/Index';

function PrivateRoute({ ...rest }) {
    const [user, setUser] = useState(null);
    let navigate = useNavigate();
    let location = useLocation();
    useEffect(() => {
        // subscribe to home component messages
        const subscription = Auth.observable.onUser().subscribe((user: any) => {
            if (user) {
                // add message to local state if not empty
                console.info('Fazendo login')
                setUser(user);
            }
            if (user == null) {
                // clear messages when empty message received
                console.info('Fazendo logout')
                setUser(null);
                navigate('/login')
            }
        });
        Auth.observable.setUser(Auth.getToken())
        // return unsubscribe method to execute when component unmounts
        return subscription.unsubscribe;
    }, []);
    return (
        <>
            <Routes>
                <>
                    {user !== null ? (
                        <>
                            <Route path="/" element={<Navigate to="/promocoes" />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="cupom/*" element={<Cupom />} />
                            <Route path="promocoes/*" element={<Promocoes />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route path="*" element={<Navigate to="/login" />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </>
                    )
                    }
                </>
            </Routes>
        </>
    );
}

function LoadingBar({ ...rest }) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // subscribe to home component messages
        const subscription = Loading.onLoading().subscribe((loading: any) => {
            if (loading) {
                // add message to local state if not empty
                setLoading(loading);
            } else {
                // clear messages when empty message received
                setLoading(false);
            }
        });
        // return unsubscribe method to execute when component unmounts
        return subscription.unsubscribe;
    }, []);
    return (
        <>
            {loading == true &&
                <div id="backdrop">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
ReactDOM.render(
    <>
        <LoadingBar />
        <BrowserRouter>
            <div className="wrapper">
                <Header />
                <div className="main">
                    <Navbar />
                    <PrivateRoute />
                </div>
            </div>
        </BrowserRouter>
    </>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
