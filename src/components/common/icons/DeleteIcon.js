import React from "react";

const DeleteIcon = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M13.6016 4.00078L12.9077 13.7148C12.8479 14.5521 12.1512 15.2008 11.3118 15.2008H4.69135C3.85193 15.2008 3.15523 14.5521 3.09542 13.7148L2.40156 4.00078M6.40156 7.20078V12.0008M9.60156 7.20078V12.0008M10.4016 4.00078V1.60078C10.4016 1.15895 10.0434 0.800781 9.60156 0.800781H6.40156C5.95973 0.800781 5.60156 1.15895 5.60156 1.60078V4.00078M1.60156 4.00078H14.4016"
      stroke="#767676"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DeleteIcon;
