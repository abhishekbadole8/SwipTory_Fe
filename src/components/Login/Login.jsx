import { useContext, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import style from "./Login.module.css";

function Login() {
    const { inputValue, setInputValue, BASE_USER_URL, setToken, loginModal, setLoginModal, isLoading, setIsLoading } = useContext(UserContext)
    const [error, setError] = useState("");

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
                setInputValue("")
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            if (error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            } else {

                setError("An error occurred during login. Please try again.");
                console.log("Error In Fetch Login:", error);
            }
        }
    }

    const handleInput = (e) => {
        setInputValue((prevValue) => (
            { ...prevValue, [e.target.name]: e.target.value }
        ))
    }

    const handleError = () => {
        let error_msg = ""
        if (inputValue.username?.length <= 2) {
            setError("Please add More letter to username")
            error_msg = "Please add More letter to username"
        }
        if (inputValue.password.length < 4) {
            setError("Password should be min 5 letters")
            error_msg = "Password should be min 5 letters"
        }
        return error_msg
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        setError("")
        const error_msg = handleError();
        if (error_msg) {
            setError(error_msg)
        } else {
            setIsLoading(true)
            await fetchLogin()
        }
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
                        <input type="password"
                            placeholder="Enter password"
                            name="password"
                            value={inputValue.password}
                            onChange={handleInput} />
                    </div>

                    {error && <h5 className={style.errorMsg}>{error}</h5>}

                    <button type="submit" className={`${style.authSubmitBtn} ${isLoading && style.authSubmitBtnDisable}`} disabled={isLoading}>
                        {isLoading ? <p className={style.loadingSpinner}></p> : "Login"}
                    </button>

                </form>

            </div>

            <div className={style.closebtn}>
                <input type="button" value="X" onClick={() => {
                    setLoginModal(!loginModal)
                    setInputValue({ username: "", password: "" })
                }} />
            </div>

        </div >
    )
}

export default Login;