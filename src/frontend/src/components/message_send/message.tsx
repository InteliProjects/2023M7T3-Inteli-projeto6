import styles from "./styles.module.scss"

type Props = {
    message: string
}

export const Send_msg = ({message}: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.msg1}>
                <p className={styles.txt1}>{message}</p>
            </div>
            <div className={styles.arrow}></div>
        </div>
        
    )
}