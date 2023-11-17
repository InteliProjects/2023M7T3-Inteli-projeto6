import {FC} from "react"
import styles from './styles.module.scss'
import NavBar from "../../components/NavBar/NavBar"
import SearchField from "../../components/SearchField/SearchField"
import DocumentTile from "../../components/DocumentTile/DocumentTile"
import Header from "../../components/Header/header"

const SavedDocs:FC = () => {

  return(
    <div className={styles.savedDocs}>
      <div className={styles.headersaved}>
        <Header />
      </div>
          
        <div className={styles.titleSaved}>
          <p>Documentos salvos</p>
        </div>
        <div className={styles.searchSaved}>
          <SearchField />
        </div>
        <div className={styles.searchTiles}>
            <div>
              <DocumentTile highlight={true} title="O que é um banco de dados relacional (RDBMS)?" description=", Um banco de dados relacional é um tipo de banco de dados que armazena e fornece acesso a pontos de dados relacionados entre si." url="https://www.oracle.com/br/database/what-is-a-relational-database/"/>
            </div>
            {/* <div>
              <DocumentTile highlight={false}/>
            </div>
            <div style={{marginTop: 10}}>
              <DocumentTile highlight={false}/>
            </div>
            <div style={{marginTop: 10}}>
              <DocumentTile highlight={false}/>
            </div> */}
        </div>
        <NavBar/>
    </div>
  ) 
}

export default SavedDocs