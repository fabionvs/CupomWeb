import React, { useState, useEffect } from 'react';
import Auth from "../../services/Auth";
import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
function Navbar() {
    const [user, setUser] = useState({} as any);
    const [messages, setMessages] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        const subscription = Auth.observable.onUser().subscribe((user: any) => {
            if (user == null) {
                setUser({});
            } else {
                setUser(user);
            }
        });
        return subscription.unsubscribe;
    }, []);

    const logout = () => {
        Auth.logout();
        navigate('/login');
    }


    return (
        <nav className="navbar navbar-expand navbar-light navbar-bg">
            <a className="sidebar-toggle js-sidebar-toggle">
                <i className="hamburger align-self-center" />
            </a>
            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    {user !== null && Object.keys(user).length > 0 &&
                        <Dropdown>
                            <Dropdown.Toggle variant="none" id="dropdown-basic">
                                <img
                                    src="/img/user.png"
                                    className="avatar img-fluid rounded me-1"
                                /> {user.user.nm_nome}
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item onClick={logout}>Sair do Sistema</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;