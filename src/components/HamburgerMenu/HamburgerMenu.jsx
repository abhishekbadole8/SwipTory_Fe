import style from "./HamburgerMenu.module.css";
import { BsFillBookmarkFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useContext } from 'react';
import { UserContext } from '../../App';
import useAuthStore from "../../store/authStore";

function HamburgerMenu({ setHamburger, handleLogout }) {

    const navigate = useNavigate()
    const { user } = useAuthStore()
    const { setAddStoryModal } = useContext(UserContext)

    return (
        <div className={style.hamburgerMenu}>

            <div className={style.menuProfile}>
                <div>
                    <FaUserCircle size={30}/>
                    <h3>{user.username}</h3>
                    <RxCross2 size={25} onClick={() => setHamburger(prev => !prev)} className={style.crossIcon} />
                </div>
                <div className={style.menuProfileLogout}>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div id={style.menuList}>
                <button onClick={() => setAddStoryModal(prev => !prev)}>Add Story</button>
                <button onClick={() => navigate('/bookmark')}><BsFillBookmarkFill color="#fff" size={23} />Bookmark</button>
                <button onClick={handleLogout}>Logout</button>
            </div>

        </div>
    )
}

export default HamburgerMenu