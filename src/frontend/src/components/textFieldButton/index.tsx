import './style.scss'
import sendIcon from "../../../../../assets/Vector.png"

type Props = {
    send: () => void
}

export const TextFieldButton = ({send}: Props) =>{
    
    return(
        <div onClick={() => send()} className='buttonDisplay'>
            <img src={sendIcon}/>
        </div>
    );
}