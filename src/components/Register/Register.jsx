import { useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import style from "./Register.module.css";

function Register() {

    const { inputValue, setInputValue, BASE_USER_URL, } = useContext(UserContext)

    const fetchRegister = async () => {
        try {
            const response = await axios.post(BASE_USER_URL + '/register', {
                ...inputValue
            })
            if (response) {
                const data = response.data
                console.log(data)
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
        fetchRegister()
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

                    <button type="submit" className={style.authSubmitBtn}>Register</button>
                </form>

            </div>

            <div className={style.closebtn}>
                <input type="button" value="X" />
            </div>

        </div>
    )
}

export default Register;