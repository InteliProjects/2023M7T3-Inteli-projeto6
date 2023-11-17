import {FC} from "react";
import FaqComponent from "../../components/Faqs/FaqComponent";
import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/Header/header";
import SearchField from "../../components/SearchField/SearchField";
import styles from "./styles.module.scss"
import FaqAddBtt from "../../assets/FaqAddBtt";

const Faq: FC = () => {
  return (
    <div className={styles.faqPage}>
      <div className={styles.headerfaq}>
      <Header></Header>
      </div>
      
      <div className={styles.pageTitle}>
        <p className={styles.titleFaq}>FAQ</p>
        <p className={styles.subtitleFaq}>Perguntas Frequentes</p>
      </div>
      <div className={styles.searchFaq}>
      <SearchField></SearchField>
      </div>
      
      <FaqComponent></FaqComponent>
      {/* <div className={styles.faqBtt}>
        <FaqAddBtt></FaqAddBtt>
      </div> */}
      <NavBar></NavBar>
    </div>
  );
};

export default Faq;
