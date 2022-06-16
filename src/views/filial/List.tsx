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
                    <h1 className="h2">Lista de Filiais</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link className="btn btn-primary" to="/filiais/cadastro">Cadastrar Filial</Link>
                    </div>
                </div>
                <Datatable edit={true} url={'/filiais/user/ativas'} hide={['updated_at', 'created_at', 'latitude', 'longitude', 'empresa_id']} header={['ID', 'Endereço', 'Status', 'Categoria']} />
            </main>
        </>
    );
}
export default ListCargo;
