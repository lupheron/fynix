import React from 'react';
import { useNavigate } from 'react-router-dom';
import css from '../../../assets/css/index.module.css';
import logo from '../../../assets/media/images/fynix.webp'

function Head() {

    const navigator = useNavigate()
    return (
        <div className={css.header}>
            <div className={css.logo_container}>
                <img src={logo} alt="" />
                <h1>FYNIX</h1>
            </div>
            <div className={css.register_container}>
                <button className={css.register_btn} onClick={() => navigator("/register")}>
                    Register
                </button>
                <button className={css.login_btn} onClick={() => navigator("/login")}>
                    Log in
                </button>
            </div>
        </div>
    );
}

export default Head;