import React, { useEffect, useState } from 'react';
import filiaisService from "../../services/Filiais";
import { Link, useNavigate } from 'react-router-dom';
import './Create.css';
import ModalConfirm from '../../components/modal/ModalConfirm'
import promocoesService from "../../services/Promocoes";
function Create() {
    const [name, setName] = useState("");
    const [cupons, setCupons] = useState("");
    const [porcentagem, setPorcentagem] = useState("");
    const [filial, setFilial] = useState("");
    const [filiais, setFiliais] = useState({} as any);
    const [vencimento, setVencimento] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [modalErrors, setModalErrors] = useState({} as any);
    useEffect(() => {
        getFiliaisAtivas()
    }, []);
    let navigate = useNavigate();

    const handleChangeName = (e: any) => {
        setName(e.target.value);
    }

    const handleChangeCupons = (e: any) => {
        if (!isNaN(e.target.value)) {
            setCupons(e.target.value);
        }
    }

    const handleChangePorcentagem = (e: any) => {
        if (Number(e.target.value) > 0 && Number(e.target.value) <= 100 || e.target.value == "") {
            setPorcentagem(e.target.value);
        }
    }

    const handleChangeFilial = (e: any) => {
        setFilial(e.target.value);
    }

    const handleChangeVencimento = (e: any) => {
        setVencimento(e.target.value);
    }


    const criarCargo = (e: any) => {
        e.preventDefault();
        promocoesService.create({ nr_cupons: cupons, nm_nome: name, nr_porcentagem: porcentagem, filial_id: filial, dt_vencimento: vencimento }).then(
            (response: any) => {
                if (response.errors) {
                    console.error(response.errors)
                    setModalErrors(response.errors)
                    return false;
                }
                navigate('/promocoes');
            },
            (error: any) => {
                console.error(error)
            }
        );
    };
    const getFiliaisAtivas = () => {
        filiaisService.getFiliaisAtivas().then(
            (response: any) => {
                setFiliais(response)
            },
            (error: any) => {
                console.error(error)
            }
        );
    };
    const confirmModal = (e: any) => {
        e.preventDefault();
        setModalShow(true)
    }
    return (
        <>
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Criar Cargo</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link className="btn btn-sm btn-outline-primary" to="/cargo">Voltar</Link>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">

                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={confirmModal}>
                                <h5>Dados do Cargo</h5>
                                <br />
                                <div className="row">
                                    <div className="mb-3 col-md-3">
                                        <label className="form-label" >Nome da Promoção</label>
                                        <input type="text" className="form-control" placeholder="Nome da Promoção" name="cd_cargo" onChange={handleChangeName} required />
                                    </div>

                                    <div className="mb-3 col-md-2">
                                        <label className="form-label" >Desconto (%)</label>
                                        <input type="text" className="form-control" placeholder="Digite a porcentagem" value={porcentagem} onChange={handleChangePorcentagem} required />
                                    </div>
                                    <div className="mb-3 col-md-2">
                                        <label className="form-label" >Quantidade de Cupons</label>
                                        <input type="text" className="form-control" placeholder="Digite a quantidade" value={cupons} onChange={handleChangeCupons} required />
                                    </div>
                                    <div className="mb-3 col-md-3">
                                        <label className="form-label" >Data de Vencimento dos Cupons</label>
                                        <input type="date" className="form-control" name='cd_cbo' placeholder="Digite a Data" onChange={handleChangeVencimento} required />
                                    </div>
                                    <div className="mb-3 col-md-5">
                                        <label className="form-label" >Selecione a Filial</label>
                                        <select className="form-select flex-grow-1" onChange={handleChangeFilial} required>
                                            <option value={""}>Selecione</option>
                                            {filiais.length > 0 && filiais.map((val: any) =>
                                                <option value={val.id}>{val.ds_endereco}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <button className='btn btn-block btn-primary btn-xs mt-3 '>Criar Promoção</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ModalConfirm
                    show={modalShow}
                    confirm={true}
                    onConfirm={criarCargo}
                    onCancel={
                        () => {
                            setModalShow(false)
                            setModalErrors({});
                        }
                    }
                    errors={modalErrors}
                    title={"Tem certeza que deseja criar essa promoção?"}
                    text={"Clique abaixo para confirmar ou cancelar a solicitação."}
                />
            </main>

        </>
    )
}
export default Create;
