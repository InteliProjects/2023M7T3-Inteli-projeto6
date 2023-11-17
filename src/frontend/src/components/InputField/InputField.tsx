import { FC } from "react"
import styles from './styles.module.scss'

type Props = {
  onChange: (file: File) => void
}

const InputField: FC<Props> = ({onChange}: Props) => {
  return <div className={styles.inputField}>
    <input style={{width:"100%", height:"50%",backgroundColor: "#fff"}}type="file" name="audio" id="" onChange={(event) => event.target.files && onChange(event.target.files[0])}/>
  </div>
}

export default InputField