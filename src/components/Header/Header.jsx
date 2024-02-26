import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import style from "./Header.module.css";
import useAuthStore from "../../store/authStore";
import { HiMenu } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import AuthButtons from "../AuthButtons/AuthButtons";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

function Header() {
    const navigate = useNavigate()

    const { isAuthenticated, logout } = useAuthStore()

    const { setIsAuthModal, setIsAuthModalValue, addStoryModal, setAddStoryModal, } = useContext(UserContext)

    const [hamburger, setHamburger] = useState(false)

    // handle logout and hamburger modal
    const handleLogout = () => {
        logout()
        setHamburger(false)
    }

    // handle open auth modal
    const handleOpenAuthModal = (value) => {
        setIsAuthModal(true)
        setIsAuthModalValue(value)
    }

    return (
        <div className={style.header}>

            <div className={style.logo} >
                <h4 onClick={() => navigate('/homepage')}>SwipTory</h4>
            </div>

            <div className={style.registerloginbtn}>

                {!isAuthenticated() ?
                    (
                        <AuthButtons handleOpenAuthModal={handleOpenAuthModal} />
                    ) :
                    (
                        <div>
                            <div className={style.rowItem}>
                                <button onClick={() => navigate('/bookmark')}><BsFillBookmarkFill color="#fff" size={18} />Bookmark</button>

                                <button onClick={() => setAddStoryModal(!addStoryModal)}>Add Story</button>

                                <FaUserCircle size={35} color="grey" />
                            </div>

                            <HiMenu size={28} onClick={() => setHamburger(!hamburger)} style={{ cursor: "pointer" }} />

                            {hamburger && <HamburgerMenu handleLogout={handleLogout} setHamburger={setHamburger} />}
                        </div>
                    )}
            </div>

        </div >
    )
}

export default Header;