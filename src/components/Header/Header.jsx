import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { UserContext } from "../../App";
import style from "./Header.module.css";
import dp from "../../assets/dp.svg"
import { RxCross2 } from "react-icons/rx";

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
                        <div className={style.rowItem}>
                            <button onClick={() => navigate('/bookmark')}><BsFillBookmarkFill color="#fff" size={18} />Bookmark</button>

                            <button onClick={() => setAddStoryModal(!addStoryModal)}>Add Story</button>

                            <img src={dp} alt="user" className={style.userimage} />
                        </div>

                        <HiMenu size={25} onClick={() => setHamburger(!hamburger)} style={{ cursor: "pointer" }} />

                        {hamburger &&
                            <div className={style.hamburgerMenu}>

                                <div className={style.menuProfile}>
                                    <div>
                                        <img src={dp} alt="user" className={style.userimage} />
                                        <h3>{decode.user.username}</h3>
                                        <RxCross2 size={25} onClick={() => setHamburger(!hamburger)} className={style.crossIcon} />
                                    </div>
                                    <div className={style.menuProfileLogout}>
                                        <button onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>

                                <div id={style.menuList}>
                                    <button onClick={() => setAddStoryModal(!addStoryModal)}>Add Story</button>
                                    <button onClick={() => navigate('/bookmark')}><BsFillBookmarkFill color="#fff" size={23} />Bookmark</button>
                                    <button onClick={handleLogout}>Logout</button>
                                </div>

                            </div>}
                    </div>}
            </div>

            {/* <div className={style.menu}>
                <HiMenu size={28}
                    style={{ cursor: "pointer" }} />
            </div> */}



        </div >
    )
}

export default Header;