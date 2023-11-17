import { useNavigate } from "react-router-dom";
import UserCommunication from "../../services/Login";
import loginImg from "../../../../../assets/loginImg.jpeg"
import { useState } from "react";

export const LoginDraft = () => {
    const [email, setEmail] = useState('');
    const [pass, setPassword] = useState('');
    const navigate = useNavigate()
    const onChangeEmail = (event: any) => {
        setEmail(event.target.value);
    }
    const onChangePass = (event: any) => {
        setPassword(event.target.value);
    }
    const handleSubmit = () => {
        UserCommunication.authUser(email, pass).then((response: any) => {
            if (response.status === 200){
                console.log("Logado!");
                navigate("/");
            }else{
                console.log("Credenciais incorretas.")
            }
        })
    }
    return(
        <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"#000", justifyContent:"center", alignItems:"center"}}>
            <div style={{display:"flex",backgroundColor:"#fff", height:"50%", width:"50%", flexDirection:"row"}}>
                <div style={{backgroundColor:"#000", width:"48.7%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                    <img style={{height: "50%", width:"50%"}}  src={loginImg}/>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", height:"30%"}}>
                        <h3 style={{color:"white", textAlign:"center", display:"flex"}}>Bem vindo ao <br/>IBM Talk-to-Watson</h3>
                    </div>
                </div>
                <div style={{backgroundColor:"#8d8d8d", width:"0.3%", height:"100%"}}>
                    
                </div>  
                <div style={{backgroundColor:"#000", width:"51%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                    <div style={{backgroundColor:"white", width:"75%", height:"25%", marginBottom:10, display:"flex", flexDirection:"column"}}>
                        <div style={{height:"40%", width:"100%", backgroundColor:"#000", textAlign:"start"}}>
                            <p style={{color:"#fff"}}>Email</p>
                        </div>
                        <div style={{height:"60%", width:"100%", backgroundColor:"#000"}}>
                            <input style={{height:"70%", width:"100%", backgroundColor:"#262626", borderWidth: 0}} type="text" value={email} onChange={onChangeEmail}/>
                        </div>
                    </div>
                    <div style={{backgroundColor:"black", width:"75%", height:"25%", marginBottom:10, display:"flex", flexDirection:"column"}}>
                        <div style={{height:"40%", width:"100%", backgroundColor:"#000", textAlign:"start"}}>
                            <p style={{color:"#fff"}}>Senha</p>
                        </div>
                        <div style={{height:"60%", width:"100%", backgroundColor:"#000"}}>
                            <input style={{height:"70%", width:"100%", backgroundColor:"#262626", borderWidth: 0}} type="password" value={pass} onChange={onChangePass} />
                        </div>
                    </div>
                    <div style={{width:"75%", height:"10%", marginTop:10}}>
                       <button style={{ height:"100%", width:"100%", borderColor:"transparent", backgroundColor:"#0F62FE", color:"#FFF", textAlign:"start"}} onClick={handleSubmit}>Efetuar Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

