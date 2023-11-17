import { FC, FormEventHandler, useEffect, useRef, useState } from "react"
import styles from './styles.module.scss'
import NavBar from "../../components/NavBar/NavBar"
import { ChatTextField } from "../../components/chatTextField"
import { TextFieldButton } from "../../components/textFieldButton"
import Header from "../../components/Header/header"
import { AudioRecord } from "../../components/audioRecorder"
import chatService from "../../services/chat"
import { Send_msg } from "../../components/message_send/message"
import { Response_message } from "../../components/message_response/msg"
import * as mqtt from 'mqtt'
import DocumentTile from "../../components/DocumentTile/DocumentTile"
import { ChatUserFeedback } from "../../components/chatUserFeedback"
import ApiSTT from "../../services/ApiSTT"

const Home: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<any>([
    {
      message: "Como posso te ajudar?",
      sender: 'chat'
    }
  ])
  const [client, setClient] = useState<any>()
  const [subscribed, setSubscribed] = useState<any>()

  const sendMessage = async (message: string) => {
    const response: any = await chatService.sendMessage(message, messages.length)

    setMessages([...messages, {
      message: message,
      sender: 'user'
    }, {
      message: response.data.response,
      sender: 'chat'
    }])
    setInputValue("")
  }

  const sendAudio = async (file: File) => {
    const index = messages.length - 1
    console.log(index)
    if (file) {
      const response: any = await ApiSTT.transcript(file)

      if (response.data) {
        sendMessage(response.data.transcript)
      }
      else {
        const newMessages = [...messages]
        newMessages.push({
          message: "Erro na transcrição",
          sender: 'user'
        })

        setMessages(newMessages)
      }
    }
  }

  const handleMessage = (payload: any) => {
    const chatMessage = JSON.parse(payload.message.toString())
    console.log(chatMessage)
    const index = Number(chatMessage.messageId)

    if (messages[index + 1]) {
      const copyMessages = [...messages]
      copyMessages[index + 1].message = "Esses são os 3 documentos encontrados"
      copyMessages[index + 1].docs = JSON.parse(chatMessage.data)
      setMessages(copyMessages)
    }

    console.log(JSON.parse(payload.message.toString()).data)
  }

  const host = "4cf184d4f13d446baf96ef6753107383.s2.eu.hivemq.cloud"
  const userTopic = `answer/2`

  useEffect(() => {
    setClient(mqtt.connect(`wss://${host}:8884/mqtt`, {
      keepalive: 20,
      clientId: "mqttreact_" + Math.random(),
      username: import.meta.env.VITE_MQTT_USERNAME,
      password: import.meta.env.VITE_MQTT_PASSWORD
    }))
    console.log('1231')
  }, [])

  useEffect(() => {
    console.log("entrou")
    if (client) {

      if (!subscribed && messages) {
        client.subscribe(userTopic, { qos: 2 }, (error: any) => {
          if (error) {
            setSubscribed(false)
            console.log('Subscribe to topics error', error)
            return false
          }
          else {
            setSubscribed(true)
            client.on('message', (topic: string, message: any) => {
              const payload = { topic, message: message };
              handleMessage(payload)

              client.unsubscribe(userTopic, error => {
                if (error) {
                  console.log('Unsubscribe error', error)
                  return false
                }
                setSubscribed(false);
              });
            })
          }
        });

      }
    }
  }, [messages])

  const renderMessage = (message: any, index: number) => {
    const content = []
    if (message) {
      if (message.sender == 'user') {
        content.push(<Response_message message={message.message} key={`user-${index}`} />)
      }
      else {
        if (!message.hidden) {
          content.push(<Send_msg message={message.message} key={`user-${index}`} />)
        }
        if (message.docs) {
          message.docs.map((doc, index) => {
            if(index < 3) {
            content.push(<DocumentTile title={doc.title} description={doc.description} url={doc.url} highlight={index == 0 ? true : false} key={index} />)

            }
          })
          content.push(<ChatUserFeedback key={'feedback'} />)
        }
      }
    }

    return content
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleAudio = async (file: File) => {
    sendAudio(file)
  }

  return (
    <div className={styles.home}>
      <div className={styles.homeHeader}>
        <Header />
      </div>
      <div className={styles.homeMensages} key='messages-0'>
        {
          messages && messages.map((message: any, index: number) => {
            return renderMessage(message, index)
          })
        }
      </div>
      <div className={styles.homeRecorder}>
        <AudioRecord onComplete={(file: File) => handleAudio(file)} />
      </div>
      <div className={styles.homeTextfield}>
        <form onSubmit={handleSubmit}>
          <ChatTextField value={inputValue} onChange={(value) => setInputValue(value)} />
          <TextFieldButton send={() => sendMessage(inputValue)} />
        </form>
      </div>
      <NavBar />
    </div>
  );
}

export default Home