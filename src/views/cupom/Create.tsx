import React, { useEffect, useState } from 'react';
import cupomService from "../../services/Cupom";
import { Link, useNavigate } from 'react-router-dom';
import './Create.css';
import ModalConfirm from '../../components/modal/ModalConfirm'
import moment from "moment";

function Create() {
    const [codigo, setCodigo] = useState("");
    const [cupom, setCupom] = useState({} as any);
    const [error, setError] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalErrors, setModalErrors] = useState({} as any);
    useEffect(() => {

    }, []);
    let navigate = useNavigate();


    const handleChangeCodigo = (e: any) => {
        setCodigo(e.target.value);
    }

    const getCupomByCode = (e: any) => {
        cupomService.getCupomByCode(codigo).then((response: any) => {
            setSucesso(false)
            if (response == "") {
                setCupom({})
                setError(true)
                return false;
            }
            setCupom(response)
            setModalShow(true)
        });
    }


    const consumirCupom = (e: any) => {
        e.preventDefault();
        cupomService.consumirCupom({cupom_id: cupom.id}).then(
            (response: any) => {
                if (response.errors) {
                    setModalErrors(response.errors)
                    return false;
                }
                setModalShow(false)
                setSucesso(true)
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
                    <h1 className="h2">Cobrar Cupom</h1>
                </div>
                <div className="row d-flex justify-content-center">

                    <div className='card'>
                        <div className='card-body'>
                            <h3>Encontre o Cupom</h3>
                            <br />
                            <div className="row">
                                <div className="mb-3 col-md-3">
                                    <label className="form-label" >Código do Cupom</label>
                                    <input type="text" className="form-control" placeholder="Digite o código" name="cd_cargo" onChange={handleChangeCodigo} />
                                </div>
                                <div className="col-auto mt-4 pt-1">
                                    <button onClick={getCupomByCode} className="btn btn-primary mb-3">Buscar Cupom</button>
                                </div>
                            </div>
                            {error == true && <div className="alert alert-danger" role="alert">
                                Cupom não encontrado! Tente novamente!
                            </div>}
                            {sucesso == true && <div className="alert alert-success" role="alert">
                                Cupom consumido com sucesso! Agora seu cliente não poderá utilizá-lo novamente.
                            </div>}
                        </div>
                    </div>
                </div>

                {modalShow &&
                    <ModalConfirm
                        show={modalShow}
                        confirm={cupom.st_consumido == false && cupom.user && moment(cupom.promocao.dt_vencimento).isBefore(moment())}
                        onConfirm={consumirCupom}
                        onCancel={
                            () => {
                                setModalShow(false)
                                setModalErrors({});
                            }
                        }
                        errors={modalErrors}
                        title={"Cupom Encontrado!"}
                        text={
                            <div className='row'>
                                <div className='col-md-6'>
                                    <dl>
                                        <dt>Promoção </dt>
                                        <dd>
                                            {cupom.promocao.nm_nome}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>Código do cupom</dt>
                                        <dd>
                                            {cupom.cd_cupom}
                                        </dd>
                                    </dl>
                                    {cupom.user && <dl>
                                        <dt>Nome do cliente</dt>
                                        <dd>
                                            {cupom.user.nm_nome}
                                        </dd>
                                    </dl>}
                                    <dl>
                                        <dt>Porcentagem de desconto</dt>
                                        <dd>
                                            {cupom.promocao.nr_porcentagem}% de desconto
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>Data de vencimento</dt>
                                        <dd>
                                            {moment(cupom.promocao.dt_vencimento).format('DD/MM/YYYY HH:mm:ss')}
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>Utilizado?</dt>
                                        <dd>
                                            {cupom.st_consumido == false ?
                                                <span className="badge rounded-pill bg-success">Não</span>
                                                :
                                                <>
                                                    <span className="badge rounded-pill bg-danger p">Sim</span>
                                                    <dt className='mt-2'>Data de Utilização:</dt>
                                                    <dd>
                                                        {moment(cupom.dt_consumido).format('DD/MM/YYYY HH:mm:ss')}
                                                    </dd>
                                                </>

                                            }
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        }
                    />}
            </main>

        </>
    )
}
export default Create;
