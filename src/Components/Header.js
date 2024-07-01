import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { ShoppingCartOutlined, LogoutOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarts } from "../Components/Redux/ViewCartReducer";

const Headers = () => {

    const dispatch = useDispatch();
    const cartstates = useSelector((state) => {
        return state.viewCart.carts;
    })

    useEffect(() => {
        dispatch(fetchCarts());
    }, [dispatch, cartstates])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <img src={logo} className="navbar-brand" alt="Logo" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink>
                        </li>
                        <NavLink to='/cart'>
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'pointer' }}>
                                    Cart: &nbsp;
                                    <Space size="middle">
                                        <Badge size="small" count={cartstates.length}>
                                            <ShoppingCartOutlined style={{ color: "white", fontSize: "24px" }} />
                                        </Badge>
                                    </Space>
                                </span>
                            </li>
                        </NavLink>
                        <li className="nav-item">
                            <NavLink exact className="nav-link" activeClassName="active" to="/">Logout <LogoutOutlined /></NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Headers;
