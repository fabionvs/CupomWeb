import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';
import promocoesService from "../../services/Promocoes";
function List() {
    const [stats, setStats] = useState({} as any);
    useEffect(() => {
        consumirCupom()
    }, []);

    const consumirCupom = () => {
        promocoesService.stats().then(
            (response: any) => {
                console.log(response)
                setStats(response);
            },
            (error: any) => {
                console.error(error)
            }
        );
    };
    return (
        <>
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Lista de Promoções</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link className="btn btn-primary" to="/promocoes/create">Criar Cupons</Link>
                    </div>
                </div>
                <div className='row d-flex justify-content-center'>
                    <div className="col-sm-3 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col mt-0">
                                        <h5 className="card-title">Cupons Totais</h5>
                                    </div>

                                    <div className="col-auto">
                                        <div className="stat text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-dollar-sign align-middle"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="mt-1 mb-3">{stats.cupons}</h1>
                                <div className="mb-0">
                                    <span className="text-muted">Cadastrados</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-xl-3">
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
                                <h1 className="mt-1 mb-3">{stats.cupons_used}</h1>
                                <div className="mb-0">
                                    <span><b>{stats.cupons_used_pct}%</b> do total</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-xl-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col mt-0">
                                        <h5 className="card-title">Cupons Consumidos</h5>
                                    </div>

                                    <div className="col-auto">
                                        <div className="stat text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-dollar-sign align-middle"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="mt-1 mb-3">{stats.cupons_consumed}</h1>
                                <div className="mb-0">
                                    <span><b>{stats.cupons_consumed_pct}%</b> do total</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Datatable hide={['updated_at', 'filial_id', 'created_at']} header={['Código', 'Nome da Promoção', 'Desconto (%)', 'Status', 'Data de Vencimento', 'Cupons']} />
            </main>
        </>
    );
}
export default List;
