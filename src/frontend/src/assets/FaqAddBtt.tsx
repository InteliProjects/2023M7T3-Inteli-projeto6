import {FC} from "react"

const FaqAddBtt:FC =() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      fill="none"
      viewBox="0 0 60 60"
    >
      <g filter="url(#filter0_d_482_1065)">
        <circle cx="30" cy="28" r="24" fill="#0050E6"></circle>
      </g>
      <path
        fill="#fff"
        fillOpacity="0.01"
        d="M0 0H24V24H0z"
        transform="translate(18 16)"
        style={{ mixBlendMode: "multiply" }}
      ></path>
      <path
        fill="#F4F4F4"
        d="M30.75 27.25V22h-1.5v5.25H24v1.5h5.25V34h1.5v-5.25H36v-1.5h-5.25z"
      ></path>
      <defs>
        <filter
          id="filter0_d_482_1065"
          width="60"
          height="60"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="2"></feOffset>
          <feGaussianBlur stdDeviation="3"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_482_1065"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_482_1065"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default FaqAddBtt;