import {FC} from "react"
import styles from './styles.module.scss'
import { useNavigate } from "react-router-dom";
import UserCommunication from "../../services/Login";
import { useState } from "react";
import LoginIcon from "../../assets/LoginIcon";

const Login:FC = () => {
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const navigate = useNavigate()
    const onChangeEmail = (event: any) => {
        setEmail(event.target.value);
    }
    const onChangePass = (event: any) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        UserCommunication.authUser(email, pass).then((response: any) => {
            if (response.status === 200){
                console.log("Logado!");
                navigate("/home");
            }else{
                navigate("/home");
                console.log("Credenciais incorretas.")
            }
        })
    }
    return(
        <div className={styles.login}>
            <div className={styles.login1}>
                <div className={styles.loginIcon}>
                    <LoginIcon></LoginIcon>
                </div>
                <p className={styles.loginTitle}>
                    Bem vindo ao
                </p>
                <p className={styles.loginTitle}>
                    <b>IBM Talk-to-Watson</b>
                </p>
            </div>
            <div className={styles.login2}>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="text" value={email} onChange={onChangeEmail} placeholder="Insira seu email"/>
                
                    <label>Senha</label>
                    <input type="password" value={pass} onChange={onChangePass} placeholder="Insira sua senha"/>
                
                </form>
                <div className={styles.submitButton}>
                    <button onClick={handleSubmit}>
                        <span>Efetuar login</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="16" height="16" fill="white" fill-opacity="0.01"/>
                            <path d="M9 3L8.285 3.6965L12.075 7.5H2V8.5H12.075L8.285 12.2865L9 13L14 8L9 3Z" fill="white"/>
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Login;

