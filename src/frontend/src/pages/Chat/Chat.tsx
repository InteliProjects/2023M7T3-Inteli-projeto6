import { Button } from "@carbon/react";
import {FC, useState, useEffect} from "react"
import Header from "../../components/Header/header";
import "./styles.module.scss"
import { Response_message } from "../../components/message_response/msg";
import { Send_msg } from "../../components/message_send/message";

const ChatPage:FC = () => {
    const [count, setCount] = useState(0);

    const onHandleClick = () =>{
        setCount(77);
    }
    return(
        <>
        <Header></Header>
        <div className="chatbox">
            <Response_message></Response_message>
            <Send_msg></Send_msg>
        </div>
        <p>Welcome to the chat page</p>
        <Button onClick={onHandleClick}>Click me</Button>
        </>
    )
}

export default ChatPage;