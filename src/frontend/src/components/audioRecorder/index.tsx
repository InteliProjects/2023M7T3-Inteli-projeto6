import { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import ApiSTT from "../../services/ApiSTT"

import RecorderImg from "../../../../../assets/microphone.png"
import RecordingImg from '../../../../../assets/Ellipse1.png'

type Props = {
  onComplete: Function
}

export const AudioRecord = ({ onComplete }: Props) => {
  const [permission, setPermission] = useState(false)
  const mediaRecorder = useRef(null)
  const [recordingStatus, setRecordingStatus] = useState("inactive")
  const [stream, setStream] = useState(null)
  const [audioChunks, setAudioChunks] = useState<any>([])
  const [audio, setAudio] = useState<any>(null)
  const mimeType = "audio/wav";

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      console.log("entrou")
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  }

  const startRecording = async () => {
    if (!permission) {
      getMicrophonePermission()
    }
    else {
      setRecordingStatus("recording");
      //create new Media recorder instance using the stream
      const media = new MediaRecorder(stream, { type: mimeType });
      //set the MediaRecorder instance to the mediaRecorder ref
      mediaRecorder.current = media;
      console.log(media)
      //invokes the start method to start the recording process
      mediaRecorder.current.start();
      let localAudioChunks: any = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") return;
        if (event.data.size === 0) return;
        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
      setTimeout(() => {
        if(mediaRecorder.current == media) {
          stopRecording()
        }
      }, 20000)
    }
  }

  const stopRecording = () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    console.log(mediaRecorder)
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        //creates a blob file from the audiochunks data
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        //creates a playable URL from the blob file.
        // const audioUrl = URL.createObjectURL(audioBlob);
        const file = new File([audioBlob], "audio");
        setAudio(file);
        setAudioChunks([]);
        onComplete(file)
      };
    }
  };

  useEffect(() => {
    getMicrophonePermission()
  }, [])

  // const recordStyle = size ? "audioRecorderButton buttonBig" : "audioRecorderButton"
  // const redRecordingStyle = opacity ? "redRecord" : "redRecording"

  return (
    <div className={styles.audioRecorderBlock}>
      <div className={`${styles.audioRecorderButton} ${recordingStatus != "inactive" && styles.buttonBig}`}>
        {recordingStatus === "inactive" ? <img src={RecorderImg} onClick={() => startRecording()} /> : <img src={RecordingImg} className={styles.redRecording} onClick={() => stopRecording()} />}
      </div>
    </div>
  )
}