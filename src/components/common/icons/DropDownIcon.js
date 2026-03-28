const DropdownIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 6.4L8 10.4L12 6.4"
        stroke="currentColor"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DropdownIcon;