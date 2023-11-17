import styles from "./styles.module.scss"

type Props = {
    message: string
}

export const Response_message = ({ message }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.msg2}>
                <p className={styles.txt2}>{message}</p>
            </div>
            <div className={styles.arrowmsg}></div>
        </div>

    )
}