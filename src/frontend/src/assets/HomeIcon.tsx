import {FC} from "react"

const HomeIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill="#fff"
        fillOpacity={0.01}
        style={{ mixBlendMode: "multiply" }}
        d="M0 0H32V32H0z"
      ></path>
      <path
        fill="#fff"
        d="M16.612 2.214a1.01 1.01 0 00-1.242 0L1 13.419l1.243 1.572L4 13.621v12.38a2.004 2.004 0 002 2h20a2.004 2.004 0 002-2V13.63L29.757 15 31 13.427 16.612 2.214zM18 26h-4v-8h4v8zm2 0v-8a2.002 2.002 0 00-2-2h-4a2.002 2.002 0 00-2 2v8H6V12.062l10-7.79 10 7.8V26h-6z"
      ></path>
    </svg>
  );
}

export default HomeIcon;