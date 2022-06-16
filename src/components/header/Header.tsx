import { Link, useLocation } from "react-router-dom";
import auth from "../../services/Auth";
import React, { useEffect, useState } from 'react';
function Header() {
    const location = useLocation();
    const [ativo, setAtivo] = useState("");

    const open = (aba: any) => {
        var removeElemento = document.getElementById(ativo);
        if (removeElemento)
            removeElemento.classList.remove("show");
        setAtivo("")
        if (aba != ativo) {
            var elemento = document.getElementById(aba);
            if (elemento)
                elemento.classList.add('show');
            setAtivo(aba);
        }
    }
    return (
        <>
            {location.pathname !== "/login" && location.pathname !== "/register" && <nav id="sidebar" className="sidebar js-sidebar">
                <div className="sidebar-content js-simplebar">
                    <a className="sidebar-brand" href="/">
                        <span className="align-middle">Zenyv Cupons</span>
                    </a>
                    <ul className="sidebar-nav">
                        <li className="sidebar-header">Menu</li>
                        <li className="sidebar-item">
                            <a className="sidebar-link sidebar-link-dopdown" onClick={() => open('pages')} >
                                <span className="align-middle"> Cupons</span>
                            </a>
                            <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar" style={{ marginLeft: '0.8rem' }}>
                                <li className="sidebar-item">
                                    <Link className="sidebar-link" to="/cupom/cobrar">
                                        <span className="align-middle">Cobrar Cupom</span>
                                    </Link>
                                </li>
                                <li className="sidebar-item">
                                    <Link className="sidebar-link" to="/cupom/listar">
                                        <span className="align-middle">Listar Cupons</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" to="/promocoes">
                                <span className="align-middle">Promoções</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <a className="sidebar-link sidebar-link-dopdown" onClick={() => open('filiais')} >
                                <span className="align-middle"> Filiais</span>
                            </a>
                            <ul id="filiais" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar" style={{ marginLeft: '0.8rem' }}>
                                <li className="sidebar-item">
                                    <Link className="sidebar-link" to="/filiais">
                                        <span className="align-middle">Minhas Filiais</span>
                                    </Link>
                                </li>
                                <li className="sidebar-item">
                                    <Link className="sidebar-link" to="/filiais/cadastro">
                                        <span className="align-middle">Cadastrar Filial</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>}
        </>
    )
}

export default Header;