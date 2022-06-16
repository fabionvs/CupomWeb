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


function Create() {
    const [endereco, setEndereco] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [modalErrors, setModalErrors] = useState({} as any);
    const [modalShow, setModalShow] = useState(false);

    let { id } = useParams();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
          });
    }, []);
    let navigate = useNavigate();

    const handleChangeEndereco = (e: any) => {
        setEndereco(e.target.value);
    }


    const criarCargo = (e: any) => {
        e.preventDefault();
        filiaisService.create({ds_endereco: endereco,latitude: latitude, longitude:longitude, nm_categoria: categoria}).then(
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
                <div className="row d-flex justify-content-center">

                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={confirmModal}>
                                <h2>Cadastrar Nova Filial</h2>
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
                                        <h3>Posicione o marcador no local correto:</h3>
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
                                    <button className='btn btn-block btn-primary btn-xs mt-3 '>Criar Nova Filial</button>
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
export default Create;
