import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import style from "./Register.module.css";

function Register() {

    const { inputValue, setInputValue, BASE_USER_URL, registerModal, setRegisterModal } = useContext(UserContext)

    const [error, setError] = useState("");

    const fetchRegister = async () => {
        try {
            const response = await axios.post(BASE_USER_URL + '/register', {
                ...inputValue
            })
            if (response) {
                const data = response.data
                setInputValue("")
            }
        } catch (error) {
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

    const handelSubmit = (e) => {
        e.preventDefault();
        setError("")
        const error_msg = handleError();

        if (error_msg) {
            setError(error_msg)
        } else {
            fetchRegister()          
        }

    }
    

    return (
        <div className={style.authContainer}>

            <div>
                <h2>Register To SwipTory</h2>

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
                    {error && <h5 className={style.errorMsg}>{error}</h5>}

                    <button type="submit" className={style.authSubmitBtn}>Register</button>
                </form>

            </div>

            <div className={style.closebtn}>
                <input type="button" value="X" onClick={() => setRegisterModal(!registerModal)} />
            </div>

        </div>
    )
}

export default Register;