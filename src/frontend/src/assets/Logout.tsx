import {FC} from "react"

const LogoutIcon: FC = () => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 32 32"
  >
      <path
        fill="#fff"
        fillOpacity={0.01}
        style={{ mixBlendMode: "multiply" }}
        d="M0 0H24V24H0z"
      ></path>
      <path d="M6 30H18C18.5302 29.9994 19.0386 29.7885 19.4135 29.4135C19.7885 29.0386 19.9994 28.5302 20 28V25H18V28H6V4H18V7H20V4C19.9994 3.46975 19.7885 2.9614 19.4135 2.58646C19.0386 2.21152 18.5302 2.00061 18 2H6C5.46975 2.00061 4.9614 2.21152 4.58646 2.58646C4.21152 2.9614 4.00061 3.46975 4 4V28C4.00061 28.5302 4.21152 29.0386 4.58646 29.4135C4.9614 29.7885 5.46975 29.9994 6 30Z" fill="white"/>
      <path d="M20.586 20.586L24.172 17H10V15H24.172L20.586 11.414L22 10L28 16L22 22L20.586 20.586Z" fill="white"/> 
    </svg>
  );
}
    export default LogoutIcon;



