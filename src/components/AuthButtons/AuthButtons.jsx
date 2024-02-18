import React from 'react'
import style from "./AuthButtons.module.css";

function AuthButtons({ handleOpenAuthModal }) {
    return (
        <div>
            <button onClick={() => handleOpenAuthModal('Register')}>Register</button>
            <button onClick={() => handleOpenAuthModal('Login')} id={style.signinbtn} >Sign In</button>
        </div>
    )
}

export default AuthButtons