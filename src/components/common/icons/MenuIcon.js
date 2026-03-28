const MenuIcon = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      className="w-6 h-6 cursor-pointer md:hidden"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
};

export default MenuIcon;