import React, { useContext, useState } from 'react'
import style from "./AuthModal.module.css";
import useAuthStore from '../../services/auth';
import validateForm from '../../utils/validateForm';
import { UserContext } from '../../App';

function AuthModal() {

    const { login, register } = useAuthStore();
    const { isAuthModalValue, setIsAuthModal, setIsAuthModalValue } = useContext(UserContext)

    const [formData, setFormData] = useState({ username: "", password: "" })
    const [errorMsg, setErrorMsg] = useState({ username: "", password: "", generic: "" });
    const [redirectMsg, setRedirectMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevValue) => ({ ...prevValue, [name]: value }))
        setErrorMsg((prevError) => ({ ...prevError, [name]: "", "generic": "" }))
    }

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData)

        if (Object.keys(errors).length === 0) {
            setIsLoading(true)
            try {
                if (isAuthModalValue === 'Login') {
                    await login({ ...formData })
                    setFormData({ username: "", password: "" })
                    setIsAuthModal(false)
                    setIsAuthModalValue("")
                } else {
                    const isRegistered = await register({ ...formData })
                    
                    if (isRegistered) {
                        setFormData({ username: "", password: "" })
                        setRedirectMsg('User Registered, Redirecting to Login...')

                        setTimeout(() => {
                            setIsAuthModalValue("Login")
                            setRedirectMsg("")
                        }, 2000);
                    }
                }
            } catch (error) {
                setErrorMsg(prev => ({ ...prev, "generic": error.message }))
            } finally {
                setIsLoading(false)
            }
        } else {
            setErrorMsg(prev => ({ ...prev, ...errors }))
        }
    }

    // handle Cancel
    const handleCancel = () => {
        setIsLoading(false)
        setFormData({ username: "", password: "" })
        setErrorMsg({ username: "", password: "", generic: "" })
        setIsAuthModal(false)
    }

    return (
        <>
            <div className={style.authContainer}>
                <div className={style.authContainerInner}>
                    <h2 className={style.modalTitle}> {isAuthModalValue} To SwipTory</h2>

                    <form method="POST" onSubmit={handleSubmit} className={style.authForm}>
                        <div className={style.inputGroup}>
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder="Enter Username" name="username" value={formData.username} onChange={handleInput} className={errorMsg.password ? style.inputError : ""} />
                            {errorMsg.username && <span className={style.errorMsg}>{errorMsg.username}</span>}
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter password" name="password" value={formData.password} onChange={handleInput} />
                            {errorMsg.password && <span className={style.errorMsg}>{errorMsg.password}</span>}
                            {errorMsg.generic && <span className={style.errorMsg}>{errorMsg.generic}</span>}
                            {redirectMsg && <span className={style.errorMsg} style={{ color: "green" }}>{redirectMsg}</span>}
                        </div>

                        <button type="submit" className={`${style.authSubmitBtn} ${isLoading && style.authSubmitBtnDisable}`} disabled={isLoading}>
                            {isLoading ? 'Loading...' : `${isAuthModalValue}`}
                        </button>
                    </form>
                </div>

                <div className={style.closebtn}>
                    <button type="button" onClick={handleCancel}>X</button>
                </div>
            </div>
        </>
    )
}

export default AuthModal