import {FC} from "react"

const Bookmark:FC =() => {
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
        d="M0 0H32V32H0z"
      />
      <path
        fill="#fff"
        d="M24 4v22.75l-7.1-3.59-.9-.45-.9.45L8 26.75V4h16zm0-2H8a2 2 0 00-2 2v26l10-5 10 5V4a2 2 0 00-2-2z"
      />
    </svg>
  );
}

export default Bookmark;