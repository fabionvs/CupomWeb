import React, { useEffect, useState } from 'react';
import './Datatable.css';
import auth from '../../services/Auth';
import moment from 'moment'
import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames';
import { useNavigate } from "react-router-dom";


const Datashow = (props: any) => {
    const [data, setData] = useState({} as any);
    const location = useLocation();
    let navigate = useNavigate();
    useEffect(() => {
        callApi();
    }, []);

    const callApi = (url?: string) => {
        let u = url || props.url || location.pathname;
        auth.callApiUrl(u, props.filter).then((response: any) => {
            let data = response.data;
            Object.keys(response.data).map(function (key: any, index: any) {
                if (props.hide.includes(key)) {
                    delete data[key];
                }
            });
            setData(data);
        });
    };


    const Body = () => {
        return (
            <>
                {Object.keys(data).length > 0 && Object.keys(data).map((val: any, i: any) =>
                    <Campo key={i} campo={val} value={data[val]} chave={i} />
                )}
            </>
        )
    }

    const Campo = (p: any) => {
        let value = p.value;
        let campo = p.campo;
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
            (value == 1) ? value = <span className="badge rounded-pill bg-success">Ativo</span> : value =
                <span className="badge rounded-pill bg-danger">Inativo</span>;
        }
        if ( campo.split('_')[0] == 'sn')  {
            (value == 1) ? value = <span className="">Sim</span> : value =
                <span className="">Não</span>;
        }
        

        if (campo.split('_')[0] == 'dt' || campo.split('_')[1] == 'at') {
            value = moment(value).format('DD/MM/YYYY HH:mm:ss');
        }
        if (props.header.hasOwnProperty(p.chave)) {
            let id = props.header[p.chave];
            campo = id;
        }
        return (
            <div className='col-md-6'>
                <dl>
                    <>
                        <dt>{campo}</dt>
                        <dd>
                            {value}
                        </dd>
                    </>
                </dl>
            </div>
        );
    }


    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">{props.nome}</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link className="btn btn-primary" to={'/' + (props.url || location.pathname).split('/')[1]}>Voltar</Link>
                </div>
            </div>
            <div className='card' style={{ overflow: "auto" }}>
                <div className='card-body'>
                    <div className='row'>
                        <Body />
                    </div>
                </div>
            </div>
        </>
    )
};
export default Datashow;
