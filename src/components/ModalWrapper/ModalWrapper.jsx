import { useContext, useRef } from "react";
import { UserContext } from "../../App";
import style from "./ModalWrapper.module.css";
import AddStory from "../AddStory/AddStory";
import AuthModal from "../AuthModal/AuthModal";
import useStoryStore from "../../store/storyStore";

function ModalWrapper() {

    const { isAuthModal, setIsAuthModal, addStoryModal, setAddStoryModal, setIsUpdate } = useContext(UserContext)
    const { setUpdateStoryInputValue } = useStoryStore()

    const modalOutsideClick = useRef()

    const handelModalOutsideClick = (e) => {
        if (modalOutsideClick.current === e.target) {
            setIsAuthModal(false)
            setAddStoryModal(false)
            setIsUpdate(false)
            setUpdateStoryInputValue({
                heading: '',
                description: '',
                category: '',
                images: [''],
            })
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