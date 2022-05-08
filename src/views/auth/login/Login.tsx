import React, { useState } from 'react';
import authService from '../../../services/Auth';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // import do hook

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    const location = useLocation();

    const onChangeUsername = (e: any) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e: any) => {
        e.preventDefault();
        authService.login({ email: username, password: password }).then(
            (response: any) => {
                if (response.error == true) {
                    alert("Login incorreto!")
                    return false;
                }
                navigate('/promocoes')
            },
            (error: any) => {
                console.log(error)
            }
        );
    };

    return (
        <div className='row d-flex flex-column min-vh-100 justify-content-center align-items-center'>
            <div className='col-12 col-xs-8 col-sm-8 col-md-6 col-lg-3'>
                <main className="form-signin card text-center">
                    <form onSubmit={handleLogin} className={'card-body'}>
                        <p className='d-flex justify-content-center'>Seu estabelecimento ainda não é cadastrado?<br />
                        </p>
                        <Link className='d-flex justify-content-center' to="/register">
                            Cadastre-se
                        </Link>
                        <img
                            className="mb-4"
                            src="images/logo-256.png"
                            width={128}
                            height={128}
                        />
                        <h1 className="h3 mb-3 fw-normal">Gerência de Estabelecimentos - Zenyv</h1>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                name="username"
                                onChange={onChangeUsername}
                            />
                            <label htmlFor="floatingInput">Nome de Usuário</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="floatingPassword"
                                placeholder="Password"
                                onChange={onChangePassword}
                            />
                            <label htmlFor="floatingPassword">Senha</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary mt-4" type="submit">
                            Entrar
                        </button>
                    </form>
                </main>
            </div>
        </div>
    )
        ;
}

export default Login;