import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../../components/header/Header';
import Navbar from '../../components/header/Navbar';
import Footer from '../../components/header/Footer';

function App() {

    const [count, setCount] = useState(0);
    const [pessoas, setPessoas] = useState([] as any);

    useEffect(() => {
        setPessoas([{ id: 1, nome: "Leo", idade: 25 }, { id: 2, nome: "Leo 2", idade: 26 }])
    }, []);

    function ListItem(props: any) {
        return <li>{props.pessoa.id}/{props.pessoa.nome}/{props.pessoa.idade}</li>;
    }

    const handleClick = () => {
        setCount(count + 1);
    }

    const listItems = pessoas.map((pessoa: any) =>
        <ListItem pessoa={pessoa} />
    );


    return (
        <>
            <main className="content">
                <div className="container-fluid p-0">
                    <h1 className="h3 mb-3">
                        Dashboard <strong>Estatístico</strong>
                    </h1>
                    <div className="row">
                        <div className="col-sm-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">Cupons</h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-shopping-bag align-middle"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">$47.482</h1>
                                    <div className="mb-0">
                                        <span className="text-muted">Anunciados</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">Cupons Adquiridos</h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-dollar-sign align-middle"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">2.542</h1>
                                    <div className="mb-0">
                                        <span className="text-muted">Totais</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">Dados Semanais</h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-activity align-middle"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">16.300</h1>
                                    <div className="mb-0">
                                        <span className="text-muted">Na última semana</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">Revenue</h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-shopping-cart align-middle"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">$20.120</h1>
                                    <div className="mb-0">
                                        <span className="badge badge-success-light"> <i className="mdi mdi-arrow-bottom-right"></i> 2.35% </span>
                                        <span className="text-muted">Since last week</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
