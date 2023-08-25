import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { UserContext } from "../../App";
import style from "./Header.module.css";
import dp from "../../assets/dp.svg"

function Header() {
    const navigate = useNavigate()

    const { token, setToken, decode, registerModal, setRegisterModal, loginModal, setLoginModal, addStoryModal, setAddStoryModal, } = useContext(UserContext)

    const [hamburger, setHamburger] = useState(false)

    const handleLogout = () => {
        setToken("")
        localStorage.removeItem('user_token_swiptory')
        setHamburger(!hamburger)
    }

    return (
        <div className={style.header}>

            <div className={style.logo} >
                <h4 onClick={() => navigate('/homepage')}>SwipTory</h4>
            </div>

            <div className={style.registerloginbtn}>
                {!token ?
                    <div>
                        <button onClick={() => setRegisterModal(!registerModal)}>Register</button>
                        <button onClick={() => setLoginModal(!loginModal)} id={style.signinbtn} >Sign In</button>
                    </div> :
                    <div>
                        <button onClick={() => navigate('/bookmark')}><BsFillBookmarkFill color="#fff" size={18} />Bookmark</button>

                        <button onClick={() => setAddStoryModal(!addStoryModal)}>Add Story</button>

                        <img src={dp} alt="user-photo" className={style.userimage} />

                        <HiMenu size={25} onClick={() => setHamburger(!hamburger)} style={{ cursor: "pointer" }} />

                        {hamburger &&
                            <div className={style.hamburgerMenu}  >
                                <h3>{decode.user.username}</h3>
                                <button onClick={handleLogout}>Logout</button>
                            </div>}

                    </div>
                }
            </div>

        </div >
    )
}

export default Header;