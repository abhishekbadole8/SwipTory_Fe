import { useContext, useRef } from "react";
import { UserContext } from "../../App";
import style from "./ModalWrapper.module.css";
import AddStory from "../AddStory/AddStory";
import AuthModal from "../AuthModal/AuthModal";

function ModalWrapper() {

    const { isAuthModal, setIsAuthModal, addStoryModal, setAddStoryModal, setIsEdit } = useContext(UserContext)

    const modalOutsideClick = useRef()

    const handelModalOutsideClick = (e) => {
        if (modalOutsideClick.current === e.target) {
            setIsAuthModal(false)
            setAddStoryModal(false)
            setIsEdit(false)
        }
    }
    
    return (
        <div className={style.modalwrapper} >
            <div className={style.overlay} />

            <div className={style.modalContent} ref={modalOutsideClick} onClick={handelModalOutsideClick}>

                {isAuthModal && <AuthModal />}
                {addStoryModal && <AddStory />}

            </div>


        </div>
    )
}

export default ModalWrapper;