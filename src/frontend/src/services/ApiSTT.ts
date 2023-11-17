import axios from "axios"

const API_URL = "http://localhost:5000/transcript"

const ApiSTT = {
  transcript: async (audio: File) => {
    try {
      const response = await axios.post(API_URL, {audio: audio}, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
      return response
    }
    catch(err) {
      return err
    }
  }
}

export default ApiSTT