import React, { useEffect, useState } from 'react';
import filiaisService from "../../services/Filiais";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Create.css';
import ModalConfirm from '../../components/modal/ModalConfirm'
import { GoogleMap, LoadScript, Marker  } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};


function Edit() {
    const [endereco, setEndereco] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [modalErrors, setModalErrors] = useState({} as any);
    const [modalShow, setModalShow] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        filiaisService.show(id).then((response: any) => {
            if (response.data == "") {
                navigate('/filiais');
                return false;
            }
            let res = response.data;
            setEndereco(res.ds_endereco);
            setLatitude(Number(res.latitude));
            setLongitude(Number(res.longitude));
            setCategoria(res.nm_categoria);
        });
    }, []);
    let navigate = useNavigate();

    const handleChangeEndereco = (e: any) => {
        setEndereco(e.target.value);
    }


    const criarCargo = (e: any) => {
        e.preventDefault();
        filiaisService.update(id, {ds_endereco: endereco,latitude: latitude, longitude:longitude, nm_categoria: categoria}).then(
            (response: any) => {
                if (response.errors) {
                    console.error(response.errors)
                    setModalErrors(response.errors)
                    return false;
                }
                navigate('/filiais');
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
                                <h5>Dados da Filial</h5>
                                <br />
                                <div className="row">
                                    <div className="mb-3 col-md-3">
                                        <label className="form-label" >Endereço</label>
                                        <input type="text" className="form-control" placeholder="Digite o endereço"  value={endereco} onChange={handleChangeEndereco} />
                                    </div>
                                    <div className="mb-3 col-md-3">
                                        <label className="form-label" >Categoria</label>
                                        <input type="text" className="form-control" placeholder="Digite a categoria" value={categoria} onChange={(e: any) => { setCategoria(e.target.value)}} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <h3>Selecione o local no mapa:</h3>
                                        <LoadScript
                                            googleMapsApiKey="AIzaSyBnQ1_KJUZ5wyjbfZAwWo-pI7D3jCVaHhE"
                                        >
                                            <GoogleMap
                                                mapContainerStyle={containerStyle}
                                                center={{ lat: latitude, lng: longitude }}
                                                zoom={10}
                                            >
                                                { /* Child components, such as markers, info windows, etc. */}
                                                <Marker onDragEnd={(e : any) => {
                                                    setLatitude(e.latLng.lat);
                                                    setLongitude(e.latLng.lng);
                                                }} draggable={true} position={{lat: latitude, lng: longitude}} />
                                            </GoogleMap>
                                        </LoadScript>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <button className='btn btn-block btn-warning btn-xs mt-3 '>Editar Dados de Filial</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ModalConfirm
                    show={modalShow}
                    onConfirm={criarCargo}
                    confirm={true}
                    onCancel={
                        () => {
                            setModalShow(false)
                            setModalErrors({});
                        }
                    }
                    errors={modalErrors}
                    title={"Tem certeza que deseja editar essas informações?"}
                    text={"Clique abaixo para confirmar ou cancelar a solicitação."}
                />
            </main>

        </>
    )
}
export default Edit;
