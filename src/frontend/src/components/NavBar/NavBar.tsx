import {FC} from "react"
import Bookmark from "../../assets/Bookmark"
import HomeIcon from "../../assets/HomeIcon";
import Unknown from "../../assets/Unknown";
import styles from './styles.module.scss'
import { Link, useLocation } from "react-router-dom";


const NavBar:FC = () => {
    const router = useLocation();
    const currentPath = router.pathname.toLowerCase();
  
    // cor de estado das paginas
    const styleSaved =
    currentPath === '/saveddocs' ? styles['navitemselected'] : currentPath === '/home' ? styles['navitem'] : currentPath === '/faq' ? styles['navitem']: '';

    const styleHome =
    currentPath === '/saveddocs' ? styles['navitem'] : currentPath === '/home' ? styles['navitemselected'] : currentPath === '/faq' ? styles['navitem']: '';

    const styleFaq =
    currentPath === '/saveddocs' ? styles['navitem'] : currentPath === '/home' ? styles['navitem'] : currentPath === '/faq' ? styles['navitemselected']: '';

  return(
    <div className={styles.nav}>
        <div className={styles.navbar}>
            <div className={styleSaved}>
                <Link className={styles.navbutton} to="/savedDocs"  >
                    <Bookmark />
                    <p>Salvos</p>
                </Link>
            </div>
            <div className={styleHome}>
                <Link className={styles.navbutton} to="/Home">
                    <HomeIcon />
                    <p>Home</p>
                </Link>
            </div>
            <div className={styleFaq}>
                <Link className={styles.navbutton} to="/Faq">
                    <Unknown />
                    <p>FAQ</p>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default NavBar