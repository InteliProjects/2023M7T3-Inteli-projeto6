import axios from "axios"

const API_URL = "http://localhost:8000/v1/communication/sendNLP"

const chatService = {
  sendMessage: async (text: string, id: number) => {
    try {
      const response = await axios.post(API_URL, {data: text, userId: 2, messageId: id})
      return response
    }
    catch(err) {
      return err
    }
  }
}

export default chatService