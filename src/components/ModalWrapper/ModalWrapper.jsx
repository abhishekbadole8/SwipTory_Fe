import { useContext, useRef } from "react";
import Login from "../Login/Login"
import Register from "../Register/Register";
import { UserContext } from "../../App";
import style from "./ModalWrapper.module.css";

function ModalWrapper() {

    const { loginModal, setLoginModal, registerModal, setRegisterModal } = useContext(UserContext)

    const modalOutsideClick = useRef()

    const handelModalOutsideClick = (e) => {
        if (modalOutsideClick.current == e.target) {
            setLoginModal(false)
            setRegisterModal(false)
        }
    }

    return (
        <div className={style.modalwrapper} ref={modalOutsideClick} onClick={handelModalOutsideClick}>

            {loginModal && <Login />}
            {registerModal && <Register />}

        </div>
    )
}

export default ModalWrapper;