import React, { useEffect, useState } from 'react';
import './Datatable.css';
import auth from '../../services/Auth';
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import classnames from 'classnames';
import { useNavigate } from "react-router-dom";


const Datatable = (props: any) => {
    const [data, setData] = useState([] as any);
    const [links, setLinks] = useState([] as any);
    const location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        callApi();
    }, []);
    useEffect(() => {
        callApi();
    }, [props.filter]);

    const callApi = (url?: string) => {
        auth.callApiUrl(url || props.url || location.pathname, props.filter).then((response) => {
            setData(response.data.data);
            setLinks(response.data.links);
        });
    };


    const Head = () => {
        return (
            <>
                <tr>
                    {props.header.map((nome: any) =>
                        <td key={nome}><b>{nome}</b></td>
                    )}
                </tr>
            </>
        )
    }
    const Body = () => {
        return (
            <>
                {data.length > 0 && data.map((val: any, i: any) =>
                    <tr key={i}>
                        <Row value={val} />
                    </tr>
                )}
            </>
        )
    }
    const Row = (p: any) => {
        return (
            <>
                {Object.keys(p.value).map((v, i, row) =>
                    <Campo key={i} campo={v} value={p.value[v]} r={p.value} last={(i + 1 === row.length)} />
                )}
            </>
        )
    }

    const Campo = (p: any) => {
        let value = p.value;
        let campo = p.campo;
        let last = p.last;
        const viewUrl = (obj: any) => {
            navigate(location.pathname + "/" + obj.id);
        }
        const editUrl = (obj: any) => {
            navigate(location.pathname + "/" + obj.id + "/editar");
        }
        const MenuColumn = (pp: any) => {
            return (
                <>
                    <td>
                        <div className="btn-group btn-group-lg" role="group" aria-label="Menu">
                            {props.visualizar && <button className="btn btn-pill btn-primary" onClick={() => viewUrl(p.r)}>Visualizar</button>}
                            {props.edit &&<button className="btn btn-pill btn-warning" onClick={() => editUrl(p.r)}>Editar</button>}
                            {props.inactivate &&<button className="btn btn-pill btn-warning" onClick={() => props.inactivate}>Inativar</button>}
                        </div>
                    </td>
                </>
            );
        }
        if (typeof value === 'object' && value !== null) {
            let t = null;
            for (let key in value) {
                if (key.split('_')[0] == 'nm' || key.split('_')[0] == 'ds') {
                    t = value[key];
                }
                // Use `key` and `value`
            }
            if (t !== null) {
                value = t;
            } else {
                return (<></>);
            }
        }
        if (campo.split('_')[0] == 'st') {
            (value == 1) ? value = <span className="badge rounded-pill bg-success">Ativo</span> : value = <span className="badge rounded-pill bg-danger">Inativo</span>;
        }
        if (campo.split('_')[0] == 'dt' || campo.split('_')[1] == 'at') {
            value = moment(value).format('DD/MM/YYYY');
        }
        if (props.hide.includes(campo)) { return (<>{last && <MenuColumn />}</>) }
        return (
            <>
                <td id={p.campo}>
                    <span>{value}</span>
                </td>
                {last && <MenuColumn />}
            </>
        );
    }

    const Pagination = (p: any) => {

        const callNewApi = (event: any, val: any) => {
            let url = "/" + val.url.split('/').pop();
            callApi(url);
        }
        return (
            <>
                <ul className="pagination mb-0">
                    {links.length > 0 && links.map((val: any, i: any) =>
                        <li key={i} className={classnames({
                            'page-item': true,
                            'active': val.active,
                            'disabled': (val.url == null)
                        })}><a className='page-link btn-sm' onClick={(e) => callNewApi(e, val)} href="#" dangerouslySetInnerHTML={{ __html: val.label }}></a></li>
                    )}
                </ul>
            </>
        )
    }

    return (
        <>
            <div className='card' style={{ overflow: "auto" }}>
                {props.title && <div className="card-header">
                    <h5 className="card-title mb-0">{props.title}</h5>
                </div>}
                <div className='card-body'>
                    <table className="table table-borderless table-responsive">
                        <thead>
                            <Head />
                        </thead>
                        <tbody>
                            <Body />
                        </tbody>
                    </table>
                </div>
                <div className='card-footer'>
                    <nav aria-label="Page navigation example">
                        <Pagination />
                    </nav>
                </div>
            </div>
        </>
    )
};
export default Datatable;
