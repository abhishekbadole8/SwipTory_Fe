import { useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import style from "./Login.module.css";

function Login() {

    const { inputValue, setInputValue, BASE_USER_URL, setToken, loginModal, setLoginModal } = useContext(UserContext)

    const fetchLogin = async () => {
        try {
            const response = await axios.post(BASE_USER_URL + '/login', {
                ...inputValue
            })
            if (response) {
                const token = await response.data.token
                setToken(token)
                localStorage.setItem('user_token_swiptory', token)
                setLoginModal(!loginModal)
                console.log('Logged In')
            }
        } catch (error) {
            console.log(`Error In Fetch Login: ${error}`)
        }
    }

    const handleInput = (e) => {
        setInputValue((prevValue) => (
            { ...prevValue, [e.target.name]: e.target.value }
        ))
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        fetchLogin()
    }
    return (
        <div className={style.authContainer}>

            <div className={style.authContainerInner}>
                <h2> Login To SwipTory</h2>

                <form method="POST" onSubmit={handelSubmit} className={style.authForm}>
                    <div className={style.username}>
                        <label htmlFor="username">Username</label>
                        <input type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={inputValue.username}
                            onChange={handleInput} />
                    </div>

                    <div className={style.password}>
                        <label htmlFor="password">Password</label>
                        <input type="text"
                            placeholder="Enter password"
                            name="password"
                            value={inputValue.password}
                            onChange={handleInput} />
                    </div>

                    <button type="submit" className={style.authSubmitBtn}>Login</button>

                </form>

            </div>

            <div className={style.closebtn}>
                <input type="button" value="X" />
            </div>

        </div>
    )
}

export default Login;