import { useContext, useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { UserContext } from "../../App";
import style from "./Header.module.css";
import dp from "../../assets/dp.svg"

function Header() {

    const { token, setToken, registerModal, setRegisterModal, loginModal, setLoginModal, } = useContext(UserContext)

    const [hamburger, setHamburger] = useState(false)

    return (
        <div className={style.header}>

            <div className={style.logo}>
                <h4>SwipTory</h4>
            </div>

            <div className={style.registerloginbtn}>
                {!token ?
                    <div>
                        <button onClick={() => setRegisterModal(!registerModal)}>Register</button>
                        <button onClick={() => setLoginModal(!loginModal)} id={style.signinbtn} >Sign In</button>
                    </div> :
                    <div>
                        <button><BsFillBookmarkFill color="#fff" size={18} />Bookmark</button>
                        <button >Add Story</button>
                        <img src={dp} alt="user-photo" className={style.userimage} />

                        <HiMenu size={25} onClick={() => setHamburger(!hamburger)} style={{ cursor: "pointer" }} />
                        {hamburger &&
                            <div className={style.hamburgerMenu}>
                                <h3>UserName</h3>
                                <button onClick={() => setToken("")}>Logout</button>
                            </div>}

                    </div>
                }
            </div>

        </div >
    )
}

export default Header;