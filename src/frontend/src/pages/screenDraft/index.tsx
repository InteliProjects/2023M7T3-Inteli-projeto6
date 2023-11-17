import { AudioRecorder } from 'react-audio-voice-recorder';
import "./style.scss"
import sendButtonPic from "../../../../../assets/Send.png"
import {FC, useEffect, useState} from "react"
import InputField from "../../components/InputField/InputField"
import ApiSTT from "../../services/ApiSTT"


export const Draft = () => {
    const [file, setFile] = useState()
    const [data, setData] = useState()
  
    const sendAudio = async (audio: File) => {
      const response: any = await ApiSTT.transcript(audio)
      
      if(response.data) {
        setData(response.data)
      }
    }

    useEffect(() => {
        console.log(data, file)
    }, [data, file])

    return(
        <div style={{backgroundColor:"#fff", height:"100vh", display:"flex", flexDirection:"column"}}>
            <div style={{height:"10%", backgroundColor:"#393939", display:"flex", flexDirection:"row", alignItems:"center",}}>
                <h1 style={{color:"#fff", marginLeft:10}}>IBM Talk to Watson</h1>
            </div>
            <div style={{height:"90%", backgroundColor:"#000", display:"flex", justifyContent:"center", alignItems:"center"}}>
                <div style={{height:"90%", width:"70%", backgroundColor:"#fff", display:"flex", flexDirection:"column"}}>
                    <div style={{height:"85%", backgroundColor:"#000"}}>

                    </div>
                    <div style={{height:"15%", backgroundColor:"#000", display:"flex", flexDirection:"column"}}>
                        <div style={{height:"40%", backgroundColor:"#000", display:"flex", alignItems:"center"}}>
                            <p style={{color:"#fff"}}>Essa resposta foi útil? (y/n)</p>
                            {/* <AudioRecorder/> */}
                        </div>
                        <div style={{height:"60%", backgroundColor:"#000", flexDirection:"row", display:"flex"}}>
                            <input style={{width:"90%", backgroundColor:"#6f6f6f", borderWidth:0}}/>
                            <div style={{width:"20%",marginLeft:50, borderColor:"transparent", backgroundColor:"#0f62fe"}}>
                                <InputField onChange={(file: any) => setFile(file)}/>
                                <button style={{width: "100%", borderColor:"#fff", backgroundColor:"transparent", color:"#FFF"}} type="submit" onClick={() => file && sendAudio(file)}>Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

