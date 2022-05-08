import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';

function ListCargo() {
    useEffect(() => {
    }, []);

    return (
        <>
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Lista de Cargos</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link className="btn btn-primary" to="/cargo/cadastro">Criar Cargo</Link>
                    </div>
                </div>
                <Datatable hide={['id','updated_at']} header={['Cargo', 'Status', 'Cod. Cargo', 'Cod. CBO', 'Data de Criação']} />
            </main>
        </>
    );
}
export default ListCargo;
