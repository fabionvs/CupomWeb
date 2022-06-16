import React, { useState } from 'react';
import authService from '../../../services/Auth';
import { useNavigate, useLocation } from 'react-router-dom'; // import do hook
import ModalConfirm from '../../../components/modal/ModalConfirm';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [avatar, setAvatar] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalErrors, setModalErrors] = useState({} as any);
    let navigate = useNavigate();
    const location = useLocation();

    const onChangeUsername = (e: any) => {
        const username = e.target.value;
        setEmail(username);
    };

    const onChangePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeNome = (e: any) => {
        const nome = e.target.value;
        setNome(nome);
    };
    const onChangeCnpj = (e: any) => {
        const cnpj = e.target.value;
        setCnpj(cnpj);
    };
    const onChangeAvatar = (e: any) => {
        const avatar = e.target.value;
        let reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onload = function () {
            let res: any = reader.result;
            setAvatar(res)
        };
    };

    const handleLogin = (e: any) => {
        e.preventDefault();
        authService.register({ email: email, password: password, nm_nome: nome, nr_cnpj: cnpj, avatar: avatar }).then(
            (response: any) => {
                if (response.errors) {
                    setModalErrors(response.errors)
                    setShowModal(true)
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
                        <img
                            className="mb-4"
                            src="images/logo-256.png"
                            width={128}
                            height={128}
                        />
                        <h1 className="h3 mb-3 fw-normal">Registro de Estabelecimento - Zenyv</h1>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                name="username"
                                onChange={onChangeUsername}
                            />
                            <label htmlFor="floatingInput">Email</label>
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
                        <div className="form-floating mt-3">
                            <input
                                type="text"
                                className="form-control"
                                name="cnpj"
                                id="floatingPassword"
                                placeholder="Nome da Empresa"
                                onChange={onChangeNome}
                            />
                            <label htmlFor="floatingPassword">Nome da Empresa</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input
                                type="text"
                                className="form-control"
                                name="cnpj"
                                id="floatingPassword"
                                placeholder="CNPJ"
                                onChange={onChangeCnpj}
                            />
                            <label htmlFor="floatingPassword">Número CNPJ</label>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="floatingPassword">Logo da Empresa</label> 
                            <input onChange={onChangeAvatar} className="form-control form-control-lg" id="formFileLg" type="file" />
                        </div>
                        <button className="w-100 btn btn-lg btn-primary mt-4" type="submit">
                            Entrar
                        </button>
                    </form>
                </main>
                <ModalConfirm
                    show={showModal}
                    onConfirm={{}}
                    onCancel={
                        () => {
                            setModalErrors({});
                            setShowModal(false)
                        }
                    }
                    errors={modalErrors}
                    title={"Ocorreu um erro!"}
                    text={"Tente novamente!"}
                />
            </div>
        </div>
    )
        ;
}

export default Register;