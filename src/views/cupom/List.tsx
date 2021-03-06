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
                    <h1 className="h2">Lista de Cupons</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link className="btn btn-primary" to="/cupom/cobrar">Cobrar Cupom</Link>
                    </div>
                </div>
                <Datatable url={'/cupons/empresa/list'} hide={['cd_cupom','updated_at', 'dt_user', 'created_at', 'promocao_id', 'user_id']} header={['Cargo', 'Status', 'Consumido?', 'Data de Consumação', 'Nome da Promoção']} />
            </main>
        </>
    );
}
export default ListCargo;
