import styles from './styles.module.scss'
import {FC} from "react"
import { Link, useLocation } from "react-router-dom";
import Bookmark from "../../assets/Bookmark"
import HomeIcon from "../../assets/HomeIcon";
import Unknown from "../../assets/Unknown";
import LogoutIcon from '../../assets/Logout';

const Header:FC = () => {

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
        <div className={styles.bloco}>
            <div className={styles.direita}>
                <p className={styles.logoText}>IBM <b>Talk to Watson</b></p>
                
                <Link className={styles.logoutSmall} to="/">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" fill="white" fill-opacity="0.01"/>
                        <path d="M4.5 22.5H13.5C13.8977 22.4995 14.279 22.3414 14.5602 22.0602C14.8414 21.7789 14.9995 21.3977 15 21V18.75H13.5V21H4.5V3H13.5V5.25H15V3C14.9995 2.60232 14.8414 2.22105 14.5602 1.93984C14.279 1.65864 13.8977 1.50046 13.5 1.5H4.5C4.10232 1.50046 3.72105 1.65864 3.43984 1.93984C3.15864 2.22105 3.00046 2.60232 3 3V21C3.00046 21.3977 3.15864 21.7789 3.43984 22.0602C3.72105 22.3414 4.10232 22.4995 4.5 22.5Z" fill="white"/>
                        <path d="M15.4395 15.4395L18.129 12.75H7.5V11.25H18.129L15.4395 8.5605L16.5 7.5L21 12L16.5 16.5L15.4395 15.4395Z" fill="white"/>
                    </svg>
                </Link>
            </div>
            
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
                <div className={styles.navitem}>
                    <Link className={styles.navbutton} to="/">
                        <LogoutIcon></LogoutIcon>
                    <p>Sair</p>
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default Header;