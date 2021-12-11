const Button = ({ key, onClick, disabled, children, style }) => (
  <button
    key={key}
    onClick={onClick}
    style={{
      margin: 8,
      minWidth: 100,
      whiteSpace: "normal",
      ...style,
    }}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
