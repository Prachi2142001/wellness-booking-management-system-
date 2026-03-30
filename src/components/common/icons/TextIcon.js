const TextIcon = ({ size = 14, color = "#367C41" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <rect width="14" height="14" rx="7" fill={color} />
      <path
        d="M4.01367 4.6314V3.36365H9.98668V4.6314H7.76012V10.6364H6.24023V4.6314H4.01367Z"
        fill="white"
      />
    </svg>
  );
};

export default TextIcon;