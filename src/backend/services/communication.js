const amqp = require("amqplib/callback_api");
const webtoken = require("jsonwebtoken");
const uuid = require("uuid").v4;
const crypt = require("bcryptjs");
require("dotenv").config();
const axios = require("axios");
const mqtt = require("mqtt");

const host = "4cf184d4f13d446baf96ef6753107383.s2.eu.hivemq.cloud";
const clientId = `backend_api`;

const client = mqtt.connect(`wss://${host}:8884/mqtt`, {
  clientId,
  reconnectPeriod: 1,
  username: process.env.mqtt_user,
  password: process.env.mqtt_password
  // clean: true,
  // connectTimeout: 4000,
  // reconnectPeriod: 1000,
});

class communicationService {
  async transcript(transcript) {
    return {
      id: uuid(),
      transcript: transcript,
    };
  }

  async nlpSend(data, userId, messageId) {
    const response = await axios.post("http://localhost:3000/process", {
      text: data,
      userId,
      messageId,
    });
    return response.data;
  }

  async nlpReceive(data, userId, messageId) {
    client.publish(`answer/${userId}`, JSON.stringify({ data, messageId: messageId }), {qos: 2});
    return { data, userId, messageId };
  }

  async sendTranscriptionToQueue(transcript) {
    const self = this;
    return new Promise((resolve, reject) => {
      const rabbitMQURL = "amqp://localhost";
      try {
        amqp.connect(rabbitMQURL, (error0, connection) => {
          if (error0) {
            throw error0;
          }

          connection.createChannel((error1, channel) => {
            if (error1) {
              throw error1;
            }

            const queue = "transcription_queue";
            channel.assertQueue(queue, {
              durable: false,
            });

            const id = uuid();
            // const message = JSON.stringify(self.Receiver(id, transcript));

            channel.sendToQueue(queue, Buffer.from(transcript));

            console.log(" [x] Sent transcription:", message);

            setTimeout(function () {
              connection.close();
              resolve("Mensagem enviada");
            }, 500);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = {
  communicationService,
};
