import {FC} from "react"

const Unknown: FC = () => {
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
          d="M16 24a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 19h-2v-4h2a2 2 0 000-4h-2a2.003 2.003 0 00-2 2v.5h-2V13a4.004 4.004 0 014-4h2a4 4 0 110 8v2z"
        ></path>
        <path
          fill="#fff"
          d="M16 30a2.076 2.076 0 01-1.473-.61L2.609 17.474a2.085 2.085 0 010-2.946L14.527 2.609a2.085 2.085 0 012.946 0l11.918 11.918a2.086 2.086 0 010 2.946L17.473 29.391A2.077 2.077 0 0116 30zm0-26a.084.084 0 00-.06.024L4.025 15.94a.084.084 0 000 .118L15.94 27.977a.084.084 0 00.118 0l11.917-11.918a.084.084 0 000-.118L16.06 4.024A.084.084 0 0016 3.999z"
        ></path>
      </svg>
    );
  }
  
  export default Unknown;