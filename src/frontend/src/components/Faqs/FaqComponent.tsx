import './style.scss';
import {FC} from "react"

const FaqComponent:FC = () => {
  const perguntas = [
    {
      id: 1,
      question: "Como iniciar o chat e fazer uma pergunta?",
      answer: "Na página Home, através do botão de áudio ou campo de texto.",
      
    },
    {
      id: 2,
      question: "De onde vem os documentos que são retornados?",
      answer:
        "Eles vem de uma base de dados da empresa, que faz uma coleta de fontes seguras e confiáveis.",
    },
    {
        id: 3,
        question: "Como é feito o processamento do áudio que eu envio no chat?",
        answer: "Esse processamento é realizado através da tecnologia IBM Speech-to-text",
        
      }
  ];

  return (
    <div  className="faqTile">
      {perguntas.map((item) => (
        <div className="containerFaqs" key={item.id} >
          <p className="text-question">{item.question}</p>
          <p className="text-answer">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}

export default FaqComponent;