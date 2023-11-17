import "./style.scss"
import upVote from "../../../../../assets/Caution.png"
import downVote from "../../../../../assets/Caution-inverted.png"

export const ChatUserFeedback = () => {
    const sendPositive = () => {
        console.log("0")
    }
    const sendNegative = () => {
        console.log("1")
    }

    return(
        <div className="blockChatFeedback">
            <div className="textBlock">
                <p className="textScale">Essa resposta foi útil?</p>
            </div>
            <div className="upvoteBlock">
                <img src={upVote} className="feedbackButton" onClick={sendPositive}/>
            </div>
            <div className="downvoteBlock">
                <img src={downVote} className="feedbackButton" onClick={sendNegative}/>
            </div>
        </div>
    );
}