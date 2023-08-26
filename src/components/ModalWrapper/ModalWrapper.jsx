import { useContext, useRef } from "react";
import Login from "../Login/Login"
import Register from "../Register/Register";
import { UserContext } from "../../App";
import style from "./ModalWrapper.module.css";
import AddStory from "../AddStory/AddStory";

function ModalWrapper() {

    const { loginModal, setLoginModal, registerModal, setRegisterModal, addStoryModal, setAddStoryModal, setIsEdit } = useContext(UserContext)

    const modalOutsideClick = useRef()

    const handelModalOutsideClick = (e) => {
        if (modalOutsideClick.current == e.target) {
            setLoginModal(false)
            setRegisterModal(false)
            setAddStoryModal(false)
            setIsEdit(false)
        }
    }
    return (
        <div className={style.modalwrapper} >
            <div className={style.overlay} />

            <div className={style.modalContent} ref={modalOutsideClick} onClick={handelModalOutsideClick}>

                {loginModal && <Login />}
                {registerModal && <Register />}
                {addStoryModal && <AddStory />}

            </div>


        </div>
    )
}

export default ModalWrapper;