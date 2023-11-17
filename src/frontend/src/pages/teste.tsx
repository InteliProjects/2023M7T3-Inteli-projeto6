import {FC} from "react"
// import styles from './styles.module.scss'
import NavBar from "../components/NavBar/NavBar"
import Header from "../components/Header/header"

const Teste:FC = () => {

  return(
    <div>
        <div>
            <Header></Header>
        </div>
      <div>
        <h1>aqui é a faq</h1>
        </div>
      <div>
        <NavBar></NavBar>
      </div>
  </div>
  ) 
}

export default Teste
