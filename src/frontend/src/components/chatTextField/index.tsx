import './style.scss'

type Props = {
    onChange: (value: string) => void,
    value: string;
}

export const ChatTextField = ({onChange, value}: Props) =>{
    return(
        <input className='inputDisplay' value={value.length > 0 ? value : ''} placeholder='Escreva sua pergunta' onChange={(e) => onChange(e.target.value)}/>
    );
}

//{setText}
//onChange={(e)=>{setText(e.target)}}