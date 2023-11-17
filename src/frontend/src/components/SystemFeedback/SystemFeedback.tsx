import {FC} from "react"
import { InlineNotification, InlineNotificationProps } from '@carbon/react';
import styles from './styles.module.scss'

interface SystemFeedbackProps extends InlineNotificationProps{
  statusIconDescription: string; //"notification"
  subtitle?: string; //"recebido com sucesso!"
  title?: string; //"Áudio"
  kind: "error" | "info" | "info-square" | "success" | "warning" | "warning-alt"; //"success", "error"
  lowContrast: boolean //{false}
  role: "alert" | "log" | "status";
}

// COMO UTILIZAR:
// SystemFeedback 
//      statusIconDescription="notification"
//       subtitle="recebido com sucesso!"
//       title="Áudio"
//       kind="success" //"success", "error"
//       lowContrast={false} 
//       onCloseButtonClick={function (event: MouseEvent): void {
//         throw new Error("Function not implemented.")
//       } } 
//       role={"alert"}>
//   </SystemFeedback>

const SystemFeedback:FC<SystemFeedbackProps> = (props) => {
    
  return(
  <div className={styles.paiNot}>
    <div className={styles.notification}>
        <InlineNotification
        statusIconDescription={props.statusIconDescription}
        subtitle={props.subtitle}
        title={props.title}
        kind={props.kind}
        lowContrast={props.lowContrast}
        role={props.role}
        ></InlineNotification>
    </div>
  </div>
    
  );
}

export default SystemFeedback;
