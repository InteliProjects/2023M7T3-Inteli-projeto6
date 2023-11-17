/* eslint-disable no-undef */
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { Response_message } from '../../components/message_response/msg';
import { Send_msg } from '../../components/message_send/message';
import { ChatTextField } from '../../components/chatTextField';

describe("Response message created correctly", () => {
  const textResponseMessage = 'Tecnologia'
  render(<Response_message message={textResponseMessage} />)
  const responseMessage = screen.getByText(textResponseMessage)

  test("Response message rendering", () => {
    expect(responseMessage).toBeInTheDocument();
  })

  test("Response message text", () => {
    expect(responseMessage).toHaveTextContent(textResponseMessage);
  })
})

describe("Send message created correctly", () => {
  const textSendMessage = 'Ok, processando seu texto'
  render(<Send_msg message={textSendMessage} />)
  const sendMessage = screen.getByText(textSendMessage)

  test("Send message text", () => {
    expect(sendMessage).toHaveTextContent(textSendMessage);
  })
})

describe("Chat textfield creted correctly", () => {
  render(<ChatTextField value='Quais são as 10 maiores empresas do Brasil?' onChange={jest.fn}/>)
  const chatTextfield = screen.queryByPlaceholderText('Escreva sua pergunta')

  test("Send message text", () => {
    expect(chatTextfield).toHaveValue('Quais são as 10 maiores empresas do Brasil?');
  })
})