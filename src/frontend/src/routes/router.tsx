import { FC } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/home/Home"
import Faq from "../pages/faq"
import SavedDocs from "../pages/savedDocs/SavedDocs"
import ChatPage from "../pages/Chat/Chat"
import  Login  from "../pages/Login/Login"
import Teste from "../pages/teste"

const Router: FC = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/Faq' element={<Faq />} />
      <Route path='/savedDocs' element={<SavedDocs />} />
      <Route path='/chatbot' element={<ChatPage />} />
      <Route path='/teste' element={<Teste />} />
    </Routes>
  </BrowserRouter>
}

export default Router